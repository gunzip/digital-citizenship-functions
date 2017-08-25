import * as express from "express";
import { HttpReq } from "./httpreq";
import { IValidable } from "./validable";

export type RequestWithValidHandler = (
  req: express.Request,
  res: express.Response,
  klass: IValidable
) => any;

export function getFor<T extends IValidable>(
  handler: RequestWithValidHandler,
  name: string,
  klass: new (param: string | object) => T
): express.RequestHandler {
  return (
    request: express.Request,
    response: express.Response,
    _: express.NextFunction
  ) => {
    const httpReq = HttpReq.createInstance(request);
    const value = httpReq.getObjectParam(name, klass);
    return handler(request, response, value);
  };
}
