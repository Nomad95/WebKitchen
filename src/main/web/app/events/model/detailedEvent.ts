export class DetailedEvent{
    id: number;
    title: string;
    type: any;
    time: any;
    date: any;
    address: string;
    dish_name: string;
    dish_kind: any;
    people_quantity: number;
    additional_info: string;
    acceptedIds: any[];
    description: string;
    photo: string;
    ownerId: number;
    shopping_list: string;
    products_list: string;
    quantity_of_products: number;
    accounts: any[];
    people_remaining: number;
    ownerUsername: string;
    ownerNick: string;


    constructor() {
        this.id = -1;
        this.title = '';
        this.type = '';
        this.time = '';
        this.date = '';
        this.address = '';
        this.dish_name = '';
        this.dish_kind = 0;
        this.people_quantity = 0;
        this.additional_info = '';
        this.acceptedIds = [];
        this.description = '';
        this.photo = '';
        this.ownerId = -1;
        this.shopping_list = '';
        this.products_list = '';
        this.quantity_of_products = 0;
        this.accounts = [];
        this.people_remaining = -1;
        this.ownerUsername = '';
        this.ownerNick = '';
    }
}
