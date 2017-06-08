import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'event-list',
    templateUrl: 'app/events/browser/event-list.component.html',
    providers: [EventService, LoginService]
})
export class EventListComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private loginService: LoginService) {
    }

    //list of all events
    private events: any[];
    
    //id of current user
    private userId = -1;

    //check if user can create event or he hasn't filled required profile fields
    private canCreateEvent = false;
    
    //disables some view before loading up events
    private viewLoaded = false;

    ngOnInit() {
        this.getEvents();
        //gets user id and then checks if user can create event
        this.getUserIdFromUsername();
    }

    /**
     * gets all events
     */
    getEvents():any {
        this.eventService.getGeneralEvents()
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
