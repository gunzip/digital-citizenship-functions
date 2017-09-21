import {
  complement,
  compose,
  filter,
  flatten,
  isEmpty,
  map,
  mapObjIndexed,
  mergeWithKey,
  values
} from "ramda";
import { isNotEmpty } from "ramda-adjunct";
import { Either, left, right } from "./either";

// tslint:disable-next-line:no-any
type TValidationResult = Either<string, any>;

interface IValidationResults {
  readonly [index: string]: ReadonlyArray<Either<string, {}>>;
}

// tslint:disable-next-line:no-any
type TPredicate = [(a: any) => boolean, string];

const makePredicate = ([predFn, e]: TPredicate) => (a: {}): TValidationResult =>
  predFn(a) ? right(a) : left(e);

const makePredicates = map(makePredicate);

const runPredicates = ([input, validations]: [object, [TPredicate]]) =>
  map(predFn => predFn(input), makePredicates(validations));

const validate = mapObjIndexed(runPredicates);

const makeValidationObject = ([l, r]: [{}, {}]) =>
  mergeWithKey((_, l1, r1) => [l1, r1])(l, r);

// const flattenInput = (a: {}, b: {}) => [merge(a, flattenObj(a)), b];

export const validateAll = compose(validate, makeValidationObject);

export const hasErrors = compose(
  complement(isEmpty),
  flatten,
  map(filter((e: TValidationResult) => e.isLeft)),
  values
);

export const getErrorStrings = (validation: IValidationResults) =>
  filter<string>(
    isNotEmpty,
    map(e => (e.isLeft ? e.left : ""), getErrors(validation))
  );

export const getErrors = (validation: IValidationResults) => {
  // tslint:disable-next-line:readonly-array
  return compose<{}, {}, {}, TValidationResult[]>(
    filter<TValidationResult>(e => e !== undefined),
    flatten,
    values
  )(validation);
};
