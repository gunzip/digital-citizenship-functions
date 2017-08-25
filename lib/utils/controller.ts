import * as express from "express";
import { HttpReq } from "./httpreq";
import { IValidable } from "./validable";

export type RequestWithValidHandler = (
  req: express.Request,
  res: express.Response,
  ...validables: IValidable[]
) => void;

/**
 * Extract strings from request and map them to Typescript types.
 *  
 * @param handler     the "typed" controller function
 * @param validables  an object in this form:
 *                    { "request_parameter_name_1": ExpectedType1.prototype, 
 *                      "request_parameter_name_2": ExpectedType2.prototype,
 *                      ... }
 * 
 * ExpectedType is a class that implements IValidable interface.
 * Object of these types have a factory function getFrom(requestParameter: string)
 * which handles validation and throws an Error in case the validation fails.
 * @see IValidable
 * 
 */
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
