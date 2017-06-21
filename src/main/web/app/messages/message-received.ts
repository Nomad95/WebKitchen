import {Person} from "./person";
export interface MessageReceived{
    id: number;
    title: string;
    messageContents: any;
    dateOfSend: string;
    wasRead: boolean;
    sender: Array<Person>;
    recipient: Array<Person>;
    checked: boolean;
    nickRecipient:string;
    nickSender:string;
}