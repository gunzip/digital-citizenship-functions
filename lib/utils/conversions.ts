import { FiscalCode } from "../api/definitions/FiscalCode";
import { ModelId } from "./documentdb_model_versioned";

/**
 * Converts a FiscalCode to a ModelId.
 *
 * Note that this is always possible since a valid FiscalCode is
 * also a valid ModelId.
 */
export function fiscalCodeToModelId(o: FiscalCode): ModelId {
  return (o as string) as ModelId;
}
