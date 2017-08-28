import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {LoginService} from "../../login/login.service";
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";

@Component({
    selector: 'event-list',
    templateUrl: 'app/events/browser/event-list.component.html',
    providers: [EventService],
    directives: [ToasterContainerComponent]
})
export class EventListComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private loginService: LoginService,
        private toasterService: ToasterService) {
    }

    //list of all events
    private events: any[];

    //id of current user
    private userId = -1;

    //pagination variables
    private currentPage = 0;
    private totalPages = [];

    //check if user can create event or he hasn't filled required profile fields
    private canCreateEvent = false;

    //disables some view before loading up events
    private viewLoaded = false;

    //configure toaster
    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit() {
        this.getEvents();
        //gets user id and then checks if user can create event
        this.getUserIdFromUsername();
    }

    /**
     * gets all events
     */
    getEvents():any {
        this.eventService.getTotalPages(this.currentPage,10)
            .subscribe(data => {
                this.totalPages = Array(data).fill().map((x,i)=>i);
                console.log("pages: "+data);
            });

        this.eventService.getGeneralEvents(this.currentPage,10)
            .subscribe(data => {
                this.events = data;
                console.log("events loaded!");
            })
    }

    /**
     * finds user ID by username
     */
    getUserIdFromUsername(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.checkIfUserCanCreateEvent(this.userId);
            });
    }

    /**
     * Fetches new page data from server
     * @param page
     */
    getNewPages(page){
        if(page != this.currentPage){
            this.currentPage = page;
            this.getEvents();
        }
    }

    getPreviousPage(){
        if(this.currentPage != 0){
            this.currentPage--;
            this.getEvents();
        }
    }

    getNextPage(){
        if(this.currentPage != (this.totalPages.length-1) ){
            this.currentPage++;
            this.getEvents();
        }
    }

    /**
     * Checks i user has filled all required fields to create event
     */
    checkIfUserCanCreateEvent(userId: number){
        this.eventService.checkIfUserCanCreateEvent(userId)
            .subscribe((data) => {
                this.canCreateEvent = data;
                this.viewLoaded = true;
                console.log("can create? : " + this.canCreateEvent);
            })
    }
}
