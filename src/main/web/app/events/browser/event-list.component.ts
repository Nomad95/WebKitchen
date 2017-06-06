import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';

@Component({
    selector: 'event-list',
    templateUrl: 'app/events/browser/event-list.component.html',
    providers: [EventService]
})
export class EventListComponent implements OnInit {
    constructor(private eventService:EventService) {
    }

    //list of all events
    private events: any[];

    //check if user can create event or he hasn't filled required profile fields
    private canCreateEvent = false;

    ngOnInit() {
        this.getEvents();
        this.checkIfUserCanCreateEvent();
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
     * Checks i user has filled all required fields to create event
     */
    checkIfUserCanCreateEvent(){
        this.eventService.checkIfUserCanCreateEvent()
            .subscribe((data) => {
                this.canCreateEvent = data;
                console.log("can create? : " + this.canCreateEvent);
            })
    }
}
