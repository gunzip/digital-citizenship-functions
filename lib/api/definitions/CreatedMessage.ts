// tslint:disable:ordered-imports
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:no-trailing-whitespace
// tslint:disable:max-line-length
// tslint:disable:jsdoc-format
// tslint:disable:interface-name
// tslint:disable:no-any

import { Either, left, right } from "../../utils/either";

import { FiscalCode } from "./FiscalCode";
import { TimeToLive } from "./TimeToLive";
import { MessageContent } from "./MessageContent";
import {
  validateAll,
  hasErrors,
  getErrorStrings,
  TValidationError
} from "../../utils/validation";

const SCHEMA_KEY = "specs#/definitions/CreatedMessage";

// tslint:disable-next-line
// console.log(ajv.getSchema(SCHEMA_KEY));

/**
 * 
 */

export interface CreatedMessage {
  readonly id?: string;

  readonly fiscal_code: FiscalCode;

  readonly time_to_live?: TimeToLive;

  readonly content: MessageContent;

  readonly sender_organization_id: string;
}

const isCreatedMessage = (arg: any, validation = {}): arg is CreatedMessage =>
  !hasErrors((validation = validateAll(SCHEMA_KEY, arg)));

export function toCreatedMessage(
  arg: any
): Either<ReadonlyArray<TValidationError>, CreatedMessage> {
  const validation = {};
  return !isCreatedMessage(arg, validation)
    ? left(getErrorStrings(validation))
    : right(arg);
}

const input = {
  content: {
    body_long: "xxx",
    body_short: "xxx"
  },
  extra: true,
  fiscal_code: "SPNDNL50R13C523K",
  id: "0",
  sender_organization_id: 1,
  time_to_live: 3600
};

const yerrors = validateAll(SCHEMA_KEY, input);

// tslint:disable:no-console
console.log(getErrorStrings(yerrors));
