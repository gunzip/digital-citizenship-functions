import * as express from "express";
import * as winston from "winston";

import * as async from "async";
import { Either } from "./either";
import { IResponse, ResponseErrorInternal } from "./response";

export type RequestHandler<R extends IResponse> = (request: express.Request) => Promise<R>;

/**
 * Transforms a typesafe RequestHandler into an Express Request Handler.
 *
 * Failed promises will be mapped to 500 errors handled by ResponseErrorGeneric.
 */
export function wrapRequestHandler<R extends IResponse>(handler: RequestHandler<R>): express.RequestHandler {
  return (request, response, _) => {
    handler(request).then(
      (r) => {
        r.apply(response);
        winston.log("debug", `wrapRequestHandler|SUCCESS|${request.url}|${r.kind}`);
      },
      (e) => {
        ResponseErrorInternal(e).apply(response);
        winston.log("debug", `wrapRequestHandler|ERROR|${request.url}|${e}`);
      },
    );
  };
}

/**
 * Interface for implementing a request middleware.
 *
 * A RequestMiddleware is just a function that validates a request or
 * extracts some object out of it.
 * The middleware returns a promise that will resolve to a value that gets
 * passed to the handler.
 * In case the validation fails, the middleware rejects the promise (the
 * value of the error is discarded). In this case the processing of the
 * following middlewares will not happen.
 * Finally, when called, the middleware has full access to the request and
 * the response objects. Access to the response object is particulary useful
 * for returning error messages when the validation fails.
 */
export type IRequestMiddleware<R extends IResponse, T> =
  (request: express.Request) => Promise<Either<R, T>>;

//
// The following are the type definitions for withRequestMiddlewares(...)
// Each overloaded type provided a type safe signature of withRequestMiddlewares with
// a certain number of middlewares. This is useful for enforcing the constraint that
// the handler should have the same number of parameters as the number of middlewares
// and each parameter must be of the same type returned by the corresponding middleware.
//

function withRequestMiddlewaresAr
  // tslint:disable-next-line
  (middlewares: ReadonlyArray<IRequestMiddleware<IResponse, any>>):
  // tslint:disable-next-line
  (handler: (...values: any[]) => Promise<any>) => RequestHandler<any> {
  return (handler) => {

    // The outer promise with resolve to a type that can either be the the type returned
    // by the handler or one of the types returned by any of the middlewares (i.e., when
    // a middleware returns an error response).

    // tslint:disable-next-line
    return (request) => new Promise<any>((resolve, reject) => {

      // tslint:disable-next-line
      const task = (middleware: IRequestMiddleware<IResponse, any>) => async (cb:
        // tslint:disable-next-line
        (err: Error | undefined, result?: any) => void) => {
        if (middleware !== undefined) {
          const response = await middleware(request);
          if (response.isLeft) {
            resolve(response.left);
            return cb(new Error(response.left.kind));
          } else {
            return cb(undefined, response.right);
          }
        }
      };

      const tasks = middlewares
          .map((mw) => task(mw))
          .filter((t) => t !== undefined);

      async.series(tasks,
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            handler
              .apply(undefined, results)
              .then(resolve, reject);
          }
      });

    });
  };
 }

 export function withRequestMiddlewares
  // tslint:disable-next-line
  (...middlewares: Array<IRequestMiddleware<any, any>>):
  // tslint:disable-next-line
  (handler: (...values: any[]) => Promise<any>) => RequestHandler<any> {
    return withRequestMiddlewaresAr(middlewares);
  }
