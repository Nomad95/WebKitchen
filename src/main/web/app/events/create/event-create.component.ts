import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SimpleListComponent} from '../../util/list/simple-list.component';
import {EventService} from '../event.service';

/* eventy pod profilem */
@Component({
    selector: 'event-create',
    templateUrl: 'app/events/create/event-create.component.html',
    providers: [EventService]
})
export class EventCreateComponent implements OnInit {
    constructor(private router:Router,
                private eventService:EventService) {
    }

    ngOnInit() {
    }

    /**
     * indicates the type of event
     * 1 for uczta dla innych
     * 2 for zorganizuj wspolne gotowanie
     */
    private typeOfEvent = null;

    /**
     * Strings for labels
     */
    private stringShoppingList = 'Lista potrzebnych zakupów';
    private stringProductsList = 'Lista posiadanych zakupów';


    /**
     * model for type 1
     */
    private newEventType1 = {
        title: '',
        type: '1',
        time: '',
        photo: '',
        people_quantity: '',
        dish_name: '',
        dish_kind: '',
        description: '',
        date: '',
        address: '',
        additional_info: '',

    };

    /**
     * model for type 2
     */
    private newEventType2 = {
        title: '',
        type: '2',
        time: '',
        photo: '',
        people_quantity: '',
        dish_name: '',
        dish_kind: '',
        description: '',
        date: '',
        address: '',
        additional_info: '',
        products_list: '',
        shopping_list: '',
        quantity_of_products: ''
    };

    /**
     * used for select html tag
     */
    private dishTypes = ['Śniadanie', 'Obiad', 'Kolacja', 'Deser'];

    /**
     * This two arrays are needed for nice representation
     * of items in html with ngFor inside the modal
     * bootstrap component (this popping window)
     */
    private tempShoppingListList:string[] = [];
    private tempProductsListList:string[] = [];

    private isEventCreated:boolean = false;


    klik() {
        console.log(this.typeOfEvent);
        console.log(this.newEventType2);
    }

    handleRecievedShoppingList(data:string[]):void {
        this.newEventType2.shopping_list = '' + data;
        this.tempShoppingListList = data;
        console.log("recieved: " + data);
        console.log("made String: " + this.newEventType2.shopping_list);
    }

    handleRecievedProductsList(data:string[]):void {
        this.newEventType2.products_list = '' + data;
        this.tempProductsListList = data;
        console.log("recieved: " + data);
        console.log("made String: " + this.newEventType2.products_list);
    }


    createNewEvent(data):void {
        //needed for proper time sql type
        data.time += ':00';
        //TODO: validation!

        //button loading toggle
        var $btn1 = $('#saveEventButton').button('loading');
        var $btn2 = $('#saveEventButtonType2').button('loading');

        console.log(data);
        console.log('stringified: ' + JSON.stringify(data));
        this.eventService.createEvent(data)
            .subscribe(
                data => {
                    console.log('Added event!');
                    $btn1.button('reset');
                    $btn2.button('reset');
                    this.isEventCreated = true
                },
                err => {
                    console.log('error adding event!');
                    $btn1.button('reset');
                    $btn2.button('reset');
                });
    }

}
