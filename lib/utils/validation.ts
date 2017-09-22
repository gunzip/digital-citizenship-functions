import {
  compose,
  filter,
  flatten,
  map,
  mapObjIndexed,
  mergeWithKey,
  values
} from "ramda";
import { isNotEmpty } from "ramda-adjunct";
import { Either, left, right } from "./either";

// tslint:disable-next-line:no-any
export type TValidationResult = Either<string, any>;

export interface IValidationResults {
  readonly [index: string]: ReadonlyArray<TValidationResult>;
}

export type IValidationRule = ReadonlyArray<TValidationPredicate>;

export type IValidationRules<T> = { readonly [K in keyof T]: IValidationRule };

export type IValidationObject<T> = {
  readonly [K in keyof T]: [{}, IValidationRule]
};

// tslint:disable-next-line:no-any
export type TValidationPredicate = [(a: any) => boolean, string];

const makePredicate = (
  [predFn, e]: TValidationPredicate
) => (a: {}): TValidationResult => (predFn(a) ? right(a) : left(e));

const makePredicates = map(makePredicate);

const runPredicates = (
  [input, validations]: [object, [TValidationPredicate]]
) => map(predFn => predFn(input), makePredicates(validations));

const validate = mapObjIndexed(runPredicates);

const makeValidationObject = <T>([l, r]: [{}, IValidationRules<T>]) =>
  mergeWithKey((_, l1, r1) => [l1, r1])(l, r);

// const flattenInput = (a: {}, b: {}) => [merge(a, flattenObj(a)), b];

// TODO: merge with all keys of validation object
// TODO: check that there are no more keys (fields) than the target object
export const validateAll = compose(validate, makeValidationObject);

export const hasErrors = compose(
  isNotEmpty,
  flatten,
  map(filter((e: TValidationResult) => e.isLeft)),
  values
);

/**
 * Extract error strings from validation results.
 * 
 * @param validation  validation results as returned from validate()
 */
export const getErrorStrings = (validation: IValidationResults) =>
  filter<string>(
    isNotEmpty,
    map<TValidationResult, string>(e => (e.isLeft ? e.left : ""))(
      getErrors(validation)
    )
  );

/**
 * Extract errors (array of Eithers) from validation results.
 * 
 * @param validation  validation results as returned from validate()
 */
export const getErrors = (validation: IValidationResults) =>
  compose<
    // typeof values input
    IValidationResults,
    // typeof values return
    ReadonlyArray<ReadonlyArray<TValidationResult>>,
    // typeof flatten return
    ReadonlyArray<TValidationResult>,
    // typeof filter return
    ReadonlyArray<TValidationResult>
  >(filter(e => e !== undefined), v => flatten<TValidationResult>(v), values)(
    validation
  );
