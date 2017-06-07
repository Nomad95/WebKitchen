import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'event-detailed',
    templateUrl: 'app/events/detailed/event-details.component.html',
    providers: [EventService, LoginService]
})
export class EventDetailsComponent implements OnInit {
    constructor(private router:ActivatedRoute,
                private eventService:EventService,
                private loginService: LoginService) {}

    //event stub
    private event = {
        type: '',
        people_remaining: -1
    };
    
    //user account id
    private userId: number = -1;

    //the type of event (1,2)
    private eventType: string;

    // if current user has already joined to this event
    private hasJoined = false;

    // if event has reached its people capacity
    private isFull = false;
    
    //only if user has fulfilled name surname sex and birth date can join
    private canJoin = false;
    
    ngOnInit() {
        this.getDetailedEvent();
        this.checkUser();
        this.getUserIdByUsername();
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

    /**
     * Checks if user has already joined to this event
     * Sets hasJoined variable
     */
    checkUser():any {
        console.log('checking user');
        this.eventService.checkUser(+this.router.snapshot.params['id'])
            .subscribe((data) => {
                this.hasJoined = data;
                console.log('data passed: ' + data);
            });
    }

    /**
     * Checks if event has free places if not sets isFull variable to true
     */
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

    /**
     * Gets user accoint id by username
     */
    getUserIdByUsername(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.checkIfUserCanJoinEvent(this.userId);
                console.log("fetched user id: "+data);
            })
    }

    /**
     * returns true if user can join events
     * @param userId account id
     */
    checkIfUserCanJoinEvent(userId: number){
        this.eventService.checkIfUserCanJoinAnEvent(userId)
            .subscribe( data => {
                this.canJoin = data
                console.log('can join?: '+data);
            });
    }
}
