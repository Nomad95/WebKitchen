import {Component, OnInit, Input} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from '@angular/router';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {MessageModel} from "../../messages/model/MessageModel";
import {MessageService} from "../../messages/message.service";
import {Messages} from "../../util/messages";

@Component({
    selector: 'user-created-events',
    templateUrl: 'app/events/profile/user-created-events.component.html',
    providers: [EventService,MessageService],
    directives: [ToasterContainerComponent]
})
export class UserCreatedEventsComponent {
    constructor(private eventService: EventService,
                private router: Router,
                private toasterService: ToasterService,
                private messageService: MessageService) {
    }

    //event from parent
    @Input() private event: any;

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    private acceptMessage: string = '';

    private declineMessage: string = '';

    /**
     * Checks if userId is within event accepted users list
     * @param userId user id we want to check
     * @returns true if array contains userId
     */
    checkIfUserIsOnAAcceptedList(userId: number): boolean{
        return this.event.acceptedIds.includes(userId);
    }

    /**
     * Adds users id to event accepted users list
     * @param userId users id
     * button pass accept or accept with message
     */
    acceptUser(userId: number){
        this.eventService.addUserIdToAcceptedList(this.event.id,userId)
            .subscribe( data => {
                this.event.acceptedIds.push(userId);
            }, err => {
                this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("","Nie mogę zaakceptować użytkownika"))
            });
    }

    /**
     * navigates to users profile page
     * @param username of user
     */
    goToProfile(username: string){
        this.router.navigate(['/profile/',username]);
    }

    //button send accept
    acceptUserAndSendMessage(user){
        this.acceptUser(user.id);
        let message = new MessageModel(Messages.MESSAGE_PART_ACCEPTED + this.event.title,new Date(),this.acceptMessage);
        this.messageService.sendMessage(message,user.nick)
            .subscribe( res => {
                this.acceptMessage = '';
            }, err => {
            });
        this.messageService.sendNotification(Messages.NOTIF_PART_ACCEPTED + this.event.title,user.nick)
            .subscribe( res => {
                this.acceptMessage = '';
            }, err => {
            });
    }

    //button send decline
    declineUserAndSendMessage(user){
        this.rejectTheRequest(user);
        let message = new MessageModel(Messages.MESSAGE_PART_DECLINED + this.event.title,new Date(),this.declineMessage);
        this.messageService.sendMessage(message,user.nick)
            .subscribe( res => {
                this.declineMessage = '';
            }, err => {
            });
        this.messageService.sendNotification(Messages.NOTIF_PART_DECLINED + this.event.title,user.nick)
            .subscribe( res => {
                this.declineMessage = '';
            }, err => {
            });
    }

    /**
     * invoked when pressed button pass decline or decline with message
     */
    rejectTheRequest(user){
        //remove id from acceptedIds
        var index = this.event.acceptedIds.indexOf(user.id);
        if (index > -1) {
            this.event.acceptedIds.splice(index, 1);
        }

        //remove from users list
        index = this.event.participantsDetails.indexOf(user);
        if (index > -1) {
            this.event.participantsDetails.splice(index, 1);
        }

        //send info to update Event in database
        this.eventService.rejectUserParticipation(this.event.id,user.id)
            .subscribe( data => {
                this.event.people_remaining++;
            }, err => {
                this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("","Nie mogę usunąć użytkownika"))
            });
    }
}
