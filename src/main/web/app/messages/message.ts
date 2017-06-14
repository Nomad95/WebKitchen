import {Person} from "./person";
export interface Message{
    id: number;
    title: string;
    messageContents: any;
    dateOfSend: string;
    wasRead: boolean;
    sender: Array<Person>;
    recipient: Array<Person>;
}