import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EventService} from '../event.service';

@Component({
    selector: 'event-list',
    templateUrl: 'app/events/browser/event-list.component.html',
    providers: [EventService]
})
export class EventListComponent implements OnInit {
    constructor(private router:Router, private eventService:EventService) {
    }

    private events:any[];

    // on-init
    ngOnInit() {
        this.getEvents();
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

}
