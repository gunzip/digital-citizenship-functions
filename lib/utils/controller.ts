import * as express from "express";
import { HttpReq } from "./httpreq";
import { IValidable } from "./validable";

export type RequestWithValidHandler = (
  req: express.Request,
  res: express.Response,
  ...validables: IValidable[]
) => void;

export function mapRequestToParams(
  handler: RequestWithValidHandler,
  validables: { [name: string]: IValidable }
): express.RequestHandler {
  return (
    request: express.Request,
    response: express.Response,
    _: express.NextFunction
  ) => {
    const httpReq = HttpReq.createInstance(request);
    const values = Object.keys(validables).map((k: string) => {
      return httpReq.getObjectParam(k, validables[k]);
    });
    return handler.apply(null, [request, response, ...values]);
  };
}
