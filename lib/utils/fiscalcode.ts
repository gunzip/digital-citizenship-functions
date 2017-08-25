import * as codiceFiscaleItaliano from "codice-fiscale-italiano";
import { IValidable } from "./validable";

export class FiscalCode implements IValidable {
  private cf: string;
  private constructor(cf: string) {
    this.cf = cf;
  }
  public getFrom(cf: string): FiscalCode {
    const isValid: boolean = !(
      cf.toUpperCase() !== cf && codiceFiscaleItaliano.validateCF(cf)
    );
    if (!isValid) {
      throw new Error(`Invalid parameter: ${cf}`);
    }
    return new FiscalCode(cf);
  }
  public toString() {
    return this.cf;
  }
}
