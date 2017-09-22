import * as Ajv from "ajv";
import draft4 = require("ajv/lib/refs/json-schema-draft-04.json");
import { specs } from "../api/public_api_v1";

const ajv = new Ajv({ meta: draft4, allErrors: true });
ajv.compile(Object.assign({ $id: "specs" }, specs));

// tslint:disable-next-line
// console.log(ajv.getSchema(SCHEMA_KEY));

export const validateAll = (schemaKey: string, data: {}) => () =>
  ajv.validate(schemaKey, data);

export const hasErrors = (_: {}) =>
  ajv !== undefined && ajv.errors ? ajv.errors.length > 0 : false;

export const getErrorStrings = (_: {}) =>
  ajv !== undefined && ajv.errors ? ajv.errors : [];

export type TValidationError = Ajv.ErrorObject;
