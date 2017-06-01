import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';

@Component({
    selector: 'event-detailed',
    templateUrl: 'app/events/detailed/event-details.component.html',
    providers: [EventService]
})
export class EventDetailsComponent implements OnInit {
    constructor(private router:ActivatedRoute,
                private eventService:EventService) {
    }

    private event = {
        type: '',
        people_remaining: -1
    };
    private eventType:string;
    private hasJoined = false;
    private isFull = false;
    

    // on-init
    ngOnInit() {
        this.getDetailedEvent();
        this.checkUser();
    }

    /**
     * gets a info about event by id specified in URL
     * invoke this.router.snapshot.params() (from ActivatedRoute)
     * method to get id
     * then cast in to number adding "+"
     */
    getDetailedEvent():any {
        this.eventService.getDetailedEvent(+this.router.snapshot.params['id'])
            .subscribe(data => {
                this.event = data;
                this.switchTypeToNames();
                this.checkFreeSpace();
            });
    }

    /**
     * tries to assign user to this event
     */
    assignUserToEvent():any {
        var $btn = $('#myButton').button('loading');
        this.eventService.assignUserToEvent(+this.router.snapshot.params['id'])
            .subscribe((data) => {
                    //when succeded we reset the button and hide it with hasJoined
                    $btn.button('reset');
                    this.hasJoined = true;
                }
            );
    }

    checkUser():any {
        console.log('checking user');
        this.eventService.checkUser(+this.router.snapshot.params['id'])
            .subscribe((data) => {
                this.hasJoined = data;
                console.log('data passed: ' + data);
            });
    }

    checkFreeSpace():any {
        if (this.event.people_remaining == 0)
            this.isFull = true;
    }

    /**
     * extracts event name from event type integer value
     */
    switchTypeToNames() {
        switch (+this.event.type) {
            case 1:
                this.eventType = "Dołącz do uczty";
                break;
            case 2:
                this.eventType = "Ugotujmy coś razem";
                break;
        }
    }
}
