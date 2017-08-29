import {DetailedEvent} from "../events/model/detailedEvent";

export interface PageEvents{
    content: Array<DetailedEvent>;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    sort: any;
    first: boolean;
    size: number;
    number: number;
}