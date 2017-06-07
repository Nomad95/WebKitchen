import { Injectable } from '@angular/core';

@Injectable()
export class UtilMethods {
    constructor() {
    }

    /**
     * Takes string and returns first letter Uppercase
     * Example: forces input values to be first ltter upper case
     *      (keypress)="newEventType1.description = toUppercase(newEventType1.description)"
     * toUppercase method is defined in component as:
     *      toUppercase(value: string){
     *      return this.utilMethods.stringToUpperCase(value);
     *      }
     * @param value
     * @returns {string}
     */
    public stringToUpperCase(value: string): string{
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
    
}
