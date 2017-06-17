export class EventType1{
    
    title: string;
    type: number;
    time: any;
    photo: string;
    people_quantity: number;
    dish_name: string;
    dish_kind: number;
    description: string;
    date: any;
    address: string;
    additional_info: string;
    ownerId: number;


    constructor() {
        this.title = '';
        this.type = 1;
        this.time = '';
        this.photo = '';
        this.people_quantity = 0;
        this.dish_name = '';
        this.dish_kind = 0;
        this.description = '';
        this.date = '';
        this.address = '';
        this.additional_info = '';
        this.ownerId = -1;
    }
}