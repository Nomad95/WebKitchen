import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {LoginService} from '../../login/login.service';
import {ToasterContainerComponent} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";

@Component({
    selector: 'profile-events',
    templateUrl: 'app/events/profile/profile-events.component.html',
    providers: [EventService, LoginService],
    directives: [ToasterContainerComponent]
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
    //events that ended and can be rated
    private endedEvents: any[] = [];
    //user created events that has ended
    private endedUserEvents: any[] = [];
    //user events in which he participates
    private userParticipatedEvents: any[] = [];
    //can user create event? -> is profile filled?
    private canCreateEvent: boolean = false;

    //configure toaster container
    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

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
                    for (let event of events){
                        if(event.hasEnded){
                            this.endedUserEvents.push(event);
                        } else {
                            this.userEvents.push(event);
                        }
                    }
                });
            });
    }

    /**
     * gets user id and then all events which user participates in.
     * if event has ended pass to ended events array
     */
    private getUserEventsWhichHeParticipatesIn(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.eventService.getUserEventsWhichHeParticipates(this.userId).subscribe( events => {
                    for (let event of events){
                        if(event.hasEnded && event.accepted){
                            this.endedEvents.push(event);
                        } else {
                            this.userParticipatedEvents.push(event);
                        }
                    }
                    this.canUserCreateEvent(this.userId);

                });
            });
    }


}
