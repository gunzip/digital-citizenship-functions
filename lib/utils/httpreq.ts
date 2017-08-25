import { Request } from "express";
import { IValidable } from "./validable";

declare module "express" {
  interface Request {
    swagger: any;
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

  public getStringParam(name: string) : string {
    this._checkParam(name);
    return this.req.swagger.params[name].value;
  }

  public getObjectParam<T extends IValidable>(
    name: string,
    v: new (param: string | object) => T
  ): T {
    const param = this.getStringParam(name);
    const validable = new v(param);
    if (!validable.isValid()) {
      throw new Error("Invalid parameter");
    }
    return validable;
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
