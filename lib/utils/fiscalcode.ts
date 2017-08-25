import * as codiceFiscaleItaliano from "codice-fiscale-italiano";
import { IValidable } from "./validable";

export class FiscalCode implements IValidable {
  private cf: string;
  constructor(cf: string) {
    this.cf = cf;
  }
  public isValid(): boolean {
    return (
      this.cf.toUpperCase() === this.cf &&
      codiceFiscaleItaliano.validateCF(this.cf)
    );
  }
  public toString() {
    return this.cf;
  }
}
