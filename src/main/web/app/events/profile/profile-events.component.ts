import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {LoginService} from '../../login/login.service';

@Component({
    selector: 'profile-events',
    templateUrl: 'app/events/profile/profile-events.component.html',
    providers: [EventService, LoginService]
})
export class ProfileEventsComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private loginService: LoginService) {
    }

    //user account id
    private userId = -1;
    //user created events
    private userEvents: any[] = [];
    //user events in which he participates
    private userParticipatedEvents: any[] = [];
    //can user create event? -> is profile filled?
    private canCreateEvent: boolean = false;

    ngOnInit() {
        this.getUserEvents();
        this.getUserEventsWhichHeParticipatesIn();
    }

    /**
     * checks if user can create event
     * @param userId
     */
    private canUserCreateEvent(userId: number){
        this.eventService.checkIfUserCanCreateEvent(userId)
            .subscribe( data => this.canCreateEvent = data);
    }

    /**
     * gets all events made by user
     */
    private getUserEvents(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.eventService.getUserEventsAndParticipants(data).subscribe( events => {
                    this.userEvents = events;
                    console.log("events: "+ this.userEvents);
                });
            });
    }

    /**
     * gets all events which user participates in
     */
    private getUserEventsWhichHeParticipatesIn(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.eventService.getUserEventsWhichHeParticipates(this.userId).subscribe( events => {
                    this.userParticipatedEvents = events;
                    this.canUserCreateEvent(this.userId);
                    console.log("events: "+ this.userParticipatedEvents);
                });
            });
    }
    
    
}
