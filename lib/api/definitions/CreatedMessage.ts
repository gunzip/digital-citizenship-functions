// tslint:disable:ordered-imports
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:no-trailing-whitespace
// tslint:disable:max-line-length
// tslint:disable:jsdoc-format
// tslint:disable:interface-name
// tslint:disable:no-any

import { isFiscalCode, FiscalCode } from "./FiscalCode";
import { isTimeToLive, TimeToLive } from "./TimeToLive";
import { isMessageContent, MessageContent } from "./MessageContent";
import { isString, isNotNil } from "ramda-adjunct";
import {
  validateAll,
  hasErrors,
  IValidationResults,
  IValidationRules,
  getErrorStrings
} from "../../utils/validation";
import { Either, left, right } from "../../utils/either";

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

const validationRules: IValidationRules<CreatedMessage> = {
  content: [[isMessageContent, "message content has errors"]],
  fiscal_code: [[isFiscalCode, "must be a fiscal code"]],
  id: [[isNotNil, `id must be defined`], [isString, `id must be a string`]],
  sender_organization_id: [[isString, "send org id has errors"]],
  time_to_live: [
    [isNotNil, "time to live must be defined"],
    [isTimeToLive, "time to live has invalid format"]
  ]
};

const isCreatedMessage = (
  arg: any,
  validation: IValidationResults = {}
): arg is CreatedMessage =>
  !hasErrors((validation = validateAll([arg, validationRules])));

export function toCreatedMessage(
  arg: any
): Either<ReadonlyArray<string>, CreatedMessage> {
  const validation: IValidationResults = {};
  return !isCreatedMessage(arg, validation)
    ? left(getErrorStrings(validation))
    : right(arg);
}

// const input = {
//   content: {
//     body_long: "xxx",
//     body_short: "xxx"
//   },
//   fiscal_code: "SPNDNL50R13C523K",
//   id: "0",
//   sender_organization_id: 1,
//   time_to_live: 3600
// };

// const yerrors = validateAll([input, validationRules]);

// // tslint:disable:no-console
// console.log(getErrorStrings(yerrors));
