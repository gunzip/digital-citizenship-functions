import { chain, fromPairs, map, toPairs } from "ramda";

export const flattenObj = (obj: {}) => {
  // tslint:disable-next-line:no-any
  const go = (objX: {}): any =>
    chain(([k, v]: [{}, {}]) => {
      if (typeof v === "object") {
        return map(([kX, vX]) => [`${k}.${kX}`, vX], go(v));
      } else {
        return [[k, v]];
      }
    }, toPairs(objX));
  return fromPairs(go(obj));
};
