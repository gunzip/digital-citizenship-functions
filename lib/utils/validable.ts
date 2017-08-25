/**
 * getFrom() is a factory function that returns a new Object
 * built from a string or a json object.
 *
 * It throws an error in case validation fails.
 */
export interface IValidable {
  getFrom(c: string | object): IValidable;
}
