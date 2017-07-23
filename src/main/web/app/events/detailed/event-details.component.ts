import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventService} from '../event.service';
import {LoginService} from "../../login/login.service";
import {Location} from '@angular/common';
import {DetailedEvent} from "../model/detailedEvent";
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {MessageService} from "../../messages/message.service";
import {TokenUtils} from "../../login/token-utils";
import {Messages} from "../../util/messages";


@Component({
    selector: 'event-detailed',
    templateUrl: 'app/events/detailed/event-details.component.html',
    providers: [EventService, MessageService],
    directives: [ToasterContainerComponent]
})
export class EventDetailsComponent implements OnInit {
    constructor(private router:ActivatedRoute,
                private eventService:EventService,
                private loginService: LoginService,
                private location: Location,
                private toasterService: ToasterService,
                private messageService: MessageService) {}

    private event = new DetailedEvent();

    private userId: number = -1;

    private eventType: string;

    // if current user has already joined to this event
    private hasJoined = false;

    // if event has reached its people capacity
    private isFull = false;

    //only if user has fulfilled name surname sex and birth date can join
    private canJoin = false;

    //is user an event owner?
    private isOwner = false;

    /**
     * Configure toaster notifications
     */
    public toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit() {
        //gets event
        //gets user id by username and then checks if user can join event
        //after that we find events owner username
        this.getDetailedEvent();
        //checks user if he has already joined this event
        this.checkUser();
    }


    /**
     * gets a info about event by id specified in URL
     * invoke this.router.snapshot.params() (from ActivatedRoute)
     * method to get id
     * then cast in to number adding "+"
     */
    getDetailedEvent(): any {
        this.eventService.getDetailedEvent(+this.router.snapshot.params['id'])
            .subscribe(data => {
                this.event = data;
                console.log(JSON.stringify(data));
                this.switchTypeToNames();
                this.checkFreeSpace();
                this.getUserIdByUsername();
                this.getEventOwnerUsername(this.event.id);
            },
            err => {
                this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Nie udało się załadować wydarzenia"));
            });
    }

    /**
     * tries to assign user to this event
     */
    assignUserToEvent(): any {
        var $btn = $('#myButton').button('loading');
        this.eventService.assignUserToEvent(+this.router.snapshot.params['id'])
            .subscribe((data) => {
                    //when succeded we reset the button and hide it with hasJoined
                    $btn.button('reset');
                    this.event.people_remaining--;
                    this.hasJoined = true;
                    this.sendNotification(this.event.ownerNick);
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
     * Gets event owner username by providing event id
     */
    getEventOwnerUsername(eventId: number){
        this.eventService.getEventsOwnerUsername(eventId)
            .subscribe( data => this.event.ownerUsername = data)
    }

    /**
     * returns true if user can join events
     * @param userId account id
     */
    checkIfUserCanJoinEvent(userId: number){
        this.eventService.checkIfUserCanJoinAnEvent(userId)
            .subscribe( data => {
                this.canJoin = data;
                this.isOwner = this.isUserAnOwner(this.event.ownerId,this.userId);
                console.log('can join?: ' + data);
                console.log('is owner?: ' + this.isOwner);
            });
    }

    /**
     * Removes user from this event
     */
    resignFromEvent(){
        //send info to update Event in database
        this.eventService.rejectUserParticipation(this.event.id,this.userId)
            .subscribe( data => {
                this.event.people_remaining++;
                this.hasJoined = false;
            });
    }

    /**
     * Takes user back to previous page
     */
    goBack(){
        this.location.back();
    }

    /**
     * finds if user is owner of this event
     */
    isUserAnOwner(eventOwnerId,userId): boolean{
        return eventOwnerId == userId;
    }

    /**
     * Notify owner about will of participation
     */
    sendNotification(nick){
        let currentToKey = JSON.parse(TokenUtils.getStoredToken());
        let username = currentToKey && currentToKey.username;
        this.messageService
            .sendNotification(
                'Użytkownik '+username+Messages.NOTIF_USER_WILL_OF_PART+this.event.id,
                nick)
            .subscribe( res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
    }
}
