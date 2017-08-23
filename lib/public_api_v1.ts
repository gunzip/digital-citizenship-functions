/**
 * Main entrypoint for the public APIs handlers
 */
import { createAzureFunctionHandler } from "azure-function-express-cloudify";
import * as express from "express";

import * as yaml from "js-yaml";
import * as jsonRefs from "json-refs";
import * as swaggerExpress from "swagger-express-mw";

// Setup Express

const APIs = [
  __dirname + "./specs/notifications-public.yaml",
  __dirname + "./specs/preferences.yaml"
];

const app = express();

/////////////////

const resolveSwaggerSpecs = (apiPath: string) =>
  jsonRefs.resolveRefsAt(apiPath, {
    // Resolve all remote references
    filter: ["relative", "remote"],
    loaderOptions: {
      processContent: (res: any, cb: any) =>
        cb(undefined, yaml.safeLoad(res.text))
    }
  });

// @see https://github.com/theganyo/swagger-node-runner/releases/tag/v0.6.4
const setSwaggerReponseValidationErrorHandler = (
  middleware: swaggerExpress.ConnectMiddleware
) =>
  middleware.runner.on(
    "responseValidationError",
    (validationResponse: any, req: express.Request, res: express.Response) => {
      const context = req.get("context") as any;
      context.log("error in validation");
      context.log(validationResponse.errors);
      // console.dir(validationResponse.errors, { depth: 4 })
      res.status(500).json(validationResponse);
    }
  );

const registerSwaggerMiddleware = (config: any) =>
  new Promise((resolve, reject) => {
    swaggerExpress.create(
      config,
      (err: Error, middleware: swaggerExpress.ConnectMiddleware) => {
        if (err) {
          reject(err);
          return;
        }
        middleware.register(app);
        setSwaggerReponseValidationErrorHandler(middleware);
        resolve(app);
      }
    );
  });

const setupswaggerApi = (apiPath: string) =>
  resolveSwaggerSpecs(apiPath).then((swaggerSpecs: any) => {
    registerSwaggerMiddleware({
      appRoot: __dirname,
      swagger: swaggerSpecs.resolved
      // swaggerFile: `${__dirname}/api/file.yaml`
    });
  });

// @TODO make this async
Promise.all(APIs.map(setupswaggerApi)).then(() => {
  "initialized";
});

const handler = createAzureFunctionHandler(app);

// Binds the express app to an Azure Function handler
module.exports = (context: any) => {
  app.set("context", context);
  console.log = context.log;
  context.log("started");
  return handler(context);
};
