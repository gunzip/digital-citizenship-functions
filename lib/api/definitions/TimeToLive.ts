// tslint:disable:ordered-imports
// tslint:disable:no-consecutive-blank-lines
// tslint:disable:no-trailing-whitespace
// tslint:disable:max-line-length
// tslint:disable:jsdoc-format
// tslint:disable:interface-name
// tslint:disable:no-any

/**
 * This parameter specifies for how long (in seconds) the system will try to deliver the message to the channels configured by the user.
 */

import { Option } from "ts-option";

import {
  isWithinRangeNumber,
  toWithinRangeNumber,
  WithinRangeNumber
} from "../../utils/numbers";

export type TimeToLive = WithinRangeNumber<3600, 31536000>;

export function isTimeToLive(arg: any): arg is TimeToLive {
  return isWithinRangeNumber(arg, 3600, 31536000);
}

export function toTimeToLive(arg: any): Option<TimeToLive> {
  return toWithinRangeNumber(arg, 3600, 31536000);
}
