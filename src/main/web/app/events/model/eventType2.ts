export class EventType2{

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
    products_list: string;
    shopping_list: string;
    quantity_of_products: any;
    ownerId: number;
    
    constructor() {
        this.title = '';
        this.type = 2;
        this.time = '';
        this.photo = '';
        this.people_quantity = 2;
        this.dish_name = '';
        this.dish_kind = 0;
        this.description = '';
        this.date = '';
        this.address = '';
        this.additional_info = '';
        this.ownerId = -1;
        this.products_list = '';
        this.shopping_list = '';
        this.quantity_of_products = 0;
    }
}