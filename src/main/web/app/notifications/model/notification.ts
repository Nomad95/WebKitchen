import {Person} from "../../messages/person";
export interface Notification{
    id: number;
    content: string;
    recipient: Person;
    dateOfSend: string;
    wasRead: boolean;
    checked: 'false';
}