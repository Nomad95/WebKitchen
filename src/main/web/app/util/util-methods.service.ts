import { Injectable } from '@angular/core';
import {MailModel} from "../mail/model/MailModel";

@Injectable()
export class UtilMethods {
    constructor() {
    }

    /** //TODO: zmien komentarze xD
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

    /**
     * Takes string and return same string with lowercased all letters
     * @param value to lowercase
     * @returns {string} lowercased string
     */
    public stringAllToLowerCase(value: string): string{
        if (value) {
            return value.toLowerCase();
        }
        return value;
    }

    public static generateMailOfParticipationWillWithLink(ownerMail, eventTitle, userNick){
        return new MailModel(
            ownerMail,
            'Uczestnictwo w Twoim wydarzeniu',
            'Użytkownik '+ userNick + ' wyraził chęć uczestnictwa w wydarzeniu: ' + eventTitle +
            ' Zaakceptuj lub odrzuć jego prośbę' +
            '\n http://localhost:8080/#/profile/myprofile/events');//TODO: CHANGE THIS AFTER DEPLOYMENT
    }

}
