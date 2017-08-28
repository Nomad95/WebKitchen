export class EventRating{

    id: number;
    rating: number;
    createdDate: any;
    event: any;
    author: any;
    host: any;
    comments: any[];

    constructor() {
        this.id= null;
        this.rating = null;
        this.event = {
            id: -1
        };
        this.author = {
            id: -1
        };
        this.host = {
            id: -1
        };
    }
}