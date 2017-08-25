import { Request } from "express";
import { IValidable } from "./validable";

declare module "express" {
  interface Request {
    swagger: { params: { [name: string]: { value: string } } };
  }
}

export class HttpReq {
  public static createInstance(req: Request): HttpReq {
    return new this(req);
  }

  private req: Request;
  private constructor(req: Request) {
    this.req = req;
  }

  public getStringParam(name: string): string {
    this._checkParam(name);
    return this.req.swagger.params[name].value;
  }

  public getObjectParam<T extends IValidable>(name: string, v: T): T {
    // here takes place the actual conversion from a (string | object)
    // extracted from the HTTP (express / swagger) request to a Typescript class
    return v.getFrom(this.getStringParam(name)) as T;
  }

  private _checkParam(name: string) {
    if (
      !this.req ||
      !this.req.swagger ||
      !this.req.swagger.params ||
      !this.req.swagger.params[name]
    ) {
      throw new Error("Parameter not found in HTTP request");
    }
  }
}
