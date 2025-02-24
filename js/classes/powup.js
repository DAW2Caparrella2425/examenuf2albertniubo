import { gameObject } from './gameObject.js';

export class Powup extends gameObject {

  constructor(row, column) {
    super(row, column);
    this.enabledPowerup = false;
  }

  toString() {
    console.log(`Powup at row ${this.rowNumber} and column ${this.columnObjectNumber} and is: ${this.enabledPowerup}`);
  }
}