import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../event.service';
import {LoginService} from '../../login/login.service';
import {UtilMethods} from '../../util/util-methods.service';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';



/* eventy pod profilem */
@Component({
    selector: 'event-create',
    templateUrl: 'app/events/create/event-create.component.html',
    providers: [EventService, LoginService, UtilMethods]
})
export class EventCreateComponent implements OnInit {
    constructor(private router: Router,
                private eventService: EventService,
                private loginService: LoginService,
                private utilMethods: UtilMethods) {
    }

    ngOnInit() {
        //gets id then address and check if can create event
        //more info in method beneath
        this.findUserId();
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

    //users account id
    private userId = -1;

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

    /**
     * User address object.
     * needs to be formatted
     */
    private userAddressObject = {};

    /**
     * model for type 1 //TODO: convert this to a model
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
        ownerId: -1
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
        quantity_of_products: '',
        ownerId: -1
    };
    

    //fields for proper date picker workflow
    private dateNow: Date = new Date();
    private maxBirthYear: number = this.dateNow.getFullYear()-16;
    private minBirthYear: number = this.dateNow.getFullYear()-105;
    private maxBirthDate: Date = new Date(this.dateNow.setFullYear(this.maxBirthYear));
    private myDatePickerOptions: IMyDpOptions;
    private defaultYearAndMonth:string;

    /**
     * Intializes datepicker variables
     */
    initializeDatePickerOptions(): void{
        this.myDatePickerOptions = {
            // other options...
            minYear: <number> this.minBirthYear,
            maxYear: <number> this.maxBirthYear,
            indicateInvalidDate: true,
            showTodayBtn: false,
            openSelectorTopOfInput: true,
            markCurrentYear: false,
            allowDeselectDate: true,
            disableSince: {year: this.maxBirthDate.getFullYear(), month: this.maxBirthDate.getMonth()+1, day: this.maxBirthDate.getDate()+1}
        };
        this.defaultYearAndMonth = this.maxBirthDate.getFullYear()+"-"+(this.maxBirthDate.getMonth()+1);
    }

    /**
     * When user picks date save it to the model
     */
    onDateChanged(event: IMyDateModel) {
        if(event.formatted !== '') {
            this.newEventType1.date = event.formatted;
            this.newEventType2.date = event.formatted;
        }
        else {
            this.newEventType1.date = '';
            this.newEventType2.date = '';
        }
    }

    /**
     * Sets shopping list property on model type 2 from form input
     * Used with simple-list.component
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
     * Used with simple-list.component
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
        //parse date object to proper sql time
        data.time = data.time.toLocaleTimeString();
        console.log(data.time);

        //button loading toggle
        var $btn1 = $('#saveEventButton').button('loading');
        var $btn2 = $('#saveEventButtonType2').button('loading');

        //perform file upload TODO: a co jak zdjecie bedzie dobre a event zly? albo odwrotnie??
        this.uploadPhoto(this.selectedFile);

        //make post to create an event
        this.tryCreateEvent(data,$btn1,$btn2);
    }

    /**
     * make POST and create event
     * @param data event
     * @param $btn1 button1
     * @param $btn2 button2
     */
    tryCreateEvent(data, $btn1, $btn2){
        this.eventService.createEvent(data)
            .subscribe(
                data => {
                    console.log('Added event!');
                    $btn1.button('reset');
                    $btn2.button('reset');
                    this.isEventCreated = true;
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
            //path to img (saved in DB)
            this.newEventType1.photo = "/img/dish/" + this.selectedFile.name;
        }
    }

    /**
     * Sets private field "selectedFile" with file provided via form input for type 2
     * Photo is relative static img path
     * @param event event object from form
     */
    fileChangeType2(event) {
        //get file from input
        let fileList:FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
            //check extention
            this.isProperPhoto = EventCreateComponent.checkFileExtension(this.selectedFile);
            if (!this.isProperPhoto) {//if extension is not valid
                console.log("Wrong file extension!");
                return;
            }
            //path to img (saved in DB)
            this.newEventType2.photo = "/img/dish/" + this.selectedFile.name;
        }
    }

    /**
     * Uploads a file priovided in form
     * @param formData
     */
    uploadPhoto(formData) {
        //prevent errors when user dont provide a photo
        if(formData == null || formData == undefined){
            console.log('No photo data provided');
            return;
        }
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
        return !!(file.name.endsWith(".jpg") || file.name.endsWith(".JPG")
        || file.name.endsWith(".jpeg") || file.name.endsWith(".JPEG")
        || file.name.endsWith(".png") || file.name.endsWith(".PNG")
        || file.name.endsWith(".bmp") || file.name.endsWith(".BMP"));
    }

    /**
     * This method checks if user had filled required fields in his profile.
     * If not, he is forwarded to events page
     */
    checkIfUserCanCreateEvent(userId: number){
        this.eventService.checkIfUserCanCreateEvent(userId)
            .subscribe((data) => {
                console.log("can create? : " + data);
                if(!data)//if not redirect him
                    this.router.navigate(['/events']);
            })
    }

    /**
     * Gets user address. Next, formats address properly
     * Used after getting user id
     * @param userId user acc id
     * @returns Object containing street city nr etc
     */
    getUsersAddressInformation(userId: number){
        this.eventService.getUserAddress(userId)
            .subscribe( data =>  {
                //this.userAddressObject = data;
                this.newEventType1.address = this.formatAddressObject(data);
                this.newEventType2.address = this.formatAddressObject(data);
            });
    }

    /**
     * formats addressObject into one string
     * @param addressObj address object
     */
    formatAddressObject(addressObj){
        let resultString = '';
        //add city
        resultString = resultString + this.toUppercase(addressObj.city) + ' ';
        //add street and street number
        resultString = resultString + addressObj.street + ' ' + addressObj.streetNumber;
        //if user lives in house and didnt provide flatNumber
        if(this.hasProvidedFlatNumber(addressObj.flatNumber))
            resultString = resultString + '/' +addressObj.flatNumber;
        return resultString;
    }

    /**
     * checks is user provided flat number
     * @param flatNumber flat number from addressObj
     * @returns {boolean}
     */
    private hasProvidedFlatNumber(flatNumber){
        return flatNumber != null || flatNumber != '';
    }

    /**
     * finds user id by username then checks if user can create event
     * and then gets user address information
     */
    findUserId(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.newEventType1.ownerId = data;
                this.newEventType2.ownerId = data;
                this.userId = data;
                this.checkIfUserCanCreateEvent(this.userId);
                this.getUsersAddressInformation(this.userId);
                console.log("fetched user id: "+data);
            })
    }

    /**
     * converts string value to uppercase
     * @param value string
     * @returns  string with first letter uppercase
     */
    toUppercase(value: string){
        return this.utilMethods.stringToUpperCase(value);
    }
}
