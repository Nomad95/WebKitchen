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
    private tempShoppingListList: string[] = [];
    private tempProductsListList: string[] = [];

    /**
     * This boolean prevents double event creation after exitting bootstrap 'modal'
     */
    private isEventCreated: boolean = false;

    /**
     * Selected file from form
     */
    private selectedFile: File;

    /**
     * This boolean indicates that photo extension is proper
     */
    private isProperPhoto = true;

    klik() {
        console.log(this.typeOfEvent);
        console.log(this.newEventType2);
    }

    /**
     * Sets shopping list property on model type 2 from form input
     * @param data array of strings
     */
    handleRecievedShoppingList(data:string[]):void {
        this.newEventType2.shopping_list = '' + data;
        this.tempShoppingListList = data;
        console.log("recieved: " + data);
        console.log("made String: " + this.newEventType2.shopping_list);
    }

    /**
     * Sets products list property on model type 2 from form input
     * @param data array of strings
     */
    handleRecievedProductsList(data:string[]):void {
        this.newEventType2.products_list = '' + data;
        this.tempProductsListList = data;
        console.log("recieved: " + data);
        console.log("made String: " + this.newEventType2.products_list);
    }


    /**
     * Tries to create new event. Checks time format (postgresql). Disables button when committing a request.
     * Uploads a Photo.
     * @param data
     */
    createNewEvent(data):void {
        //needed for proper time sql type
        if (data.time.length < 7)
            data.time += ':00';

        data.time += ':00';
        //TODO: validation!

        //button loading toggle
        var $btn1 = $('#saveEventButton').button('loading');
        var $btn2 = $('#saveEventButtonType2').button('loading');

        console.log(data);
        console.log('stringified: ' + JSON.stringify(data));
        //perform file upload TODO: a co jak zdjecie bedzie dobre a event zly? albo odwrotnie??
        this.uploadPhoto(this.selectedFile);
        //make post to create an event
        this.eventService.createEvent(data)
            .subscribe(
                data => {
                    console.log('Added event!');
                    $btn1.button('reset');
                    $btn2.button('reset');
                    this.isEventCreated = true;
                    this.isEventCreated = true
                },
                err => {
                    console.log('error adding event!');
                    $btn1.button('reset');
                    $btn2.button('reset');
                });
    }

    /**
     * Sets private field "selectedFile" with file provided via form input
     * Photo is relative static img path
     * @param event event object from form
     */
    fileChangeType1(event) {

        //get file list from form input (by event)
        let fileList:FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
            //check extention
            this.isProperPhoto = EventCreateComponent.checkFileExtension(this.selectedFile);
            if (!this.isProperPhoto) {
                console.log("Wrong file extension!");
                return;
            }
            this.newEventType1.photo = "/img/dish" + this.selectedFile.name;
        }
    }

    /**
     * Sets private field "selectedFile" with file provided via form input for type 2
     * Photo is relative static img path
     * @param event event object from form
     */
    fileChangeType2(event) {
        let fileList:FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
            //check extention
            this.isProperPhoto = EventCreateComponent.checkFileExtension(this.selectedFile);
            if (!this.isProperPhoto) {//if extension is not valid
                console.log("Wrong file extension!");
                return;
            }
            this.newEventType2.photo = "/img/dish" + this.selectedFile.name;
        }
    }

    /**
     * Uploads a file priovided in form
     * @param formData
     */
    uploadPhoto(formData) {
        this.eventService.uploadPhoto(formData)
            .subscribe(data => {
                    console.log("photo Added")
                },
                err => {
                    console.log("error adding photo")
                });
    }

    /**
     * Checks wether file name has valid picture extension
     * @param file file to check ext.
     * @returns {boolean} true when valid
     */
    static checkFileExtension(file: File):boolean {
        console.log("checking extention");
        if (
            file.name.endsWith(".jpg") || file.name.endsWith(".JPG")
            || file.name.endsWith(".jpeg") || file.name.endsWith(".JPEG")
            || file.name.endsWith(".png") || file.name.endsWith(".PNG")
            || file.name.endsWith(".bmp") || file.name.endsWith(".BMP")
        )
            return true;
        else return false;
    }
}
