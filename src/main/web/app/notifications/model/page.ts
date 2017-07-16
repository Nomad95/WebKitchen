import {Notification} from "./notification";
export interface Page{
    content: Array<Notification>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    sort: any;
    first: boolean;
    size: number;
    number: number;
}
