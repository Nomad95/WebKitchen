import {Component, OnInit, Input} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from '@angular/router';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {MessageModel} from "../../messages/model/MessageModel";
import {MessageService} from "../../messages/message.service";

@Component({
    selector: 'user-created-events',
    templateUrl: 'app/events/profile/user-created-events.component.html',
    providers: [EventService,MessageService],
    directives: [ToasterContainerComponent]
})
export class UserCreatedEventsComponent implements OnInit {
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


    ngOnInit() {
    }

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
        console.log("rejecting user: "+userId);
        this.eventService.addUserIdToAcceptedList(this.event.id,userId)
            .subscribe( data => {
                console.log('accepted id: '+userId);
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
        console.log("accepting user with mess: "+user);
        this.acceptUser(user.id);
        let message = new MessageModel('Akceptacja uczestnictwa',new Date(),this.acceptMessage);
        this.messageService.sendMessage(message,user.nick)
            .subscribe( res => {
                console.log(res);
                this.acceptMessage = '';
            }, err => {
                console.log(err);
            });
        this.messageService.sendNotification('Zaakceptowano twoje uczestnictwo',user.nick)
            .subscribe( res => {
                console.log(res);
                this.acceptMessage = '';
            }, err => {
                console.log(err);
            });
    }

    //button send decline
    declineUserAndSendMessage(user){
        console.log("rejecting user w mess: "+user);
        this.rejectTheRequest(user);
        let message = new MessageModel('Odrzucenie uczestnictwa',new Date(),this.declineMessage);
        this.messageService.sendMessage(message,user.nick)
            .subscribe( res => {
                console.log(res);
                this.declineMessage = '';
            }, err => {
                console.log(err);
            });
        this.messageService.sendNotification('Odrzucono twoje uczestnictwo w wydarzeniu',user.nick)
            .subscribe( res => {
                console.log(res);
                this.declineMessage = '';
            }, err => {
                console.log(err);
            });
    }

    /**
     * invoked when pressed button pass decline or decline with message
     */
    rejectTheRequest(user){
        console.log("rejecting user: "+user);
        //remove id from acceptedIds
        var index = this.event.acceptedIds.indexOf(user.id);
        if (index > -1) {
            this.event.acceptedIds.splice(index, 1);
        }
        console.log('accepted ids: ' + this.event.acceptedIds);

        //remove from users list
        index = this.event.participantsDetails.indexOf(user);
        console.log('index of user: '+ index );
        if (index > -1) {
            this.event.participantsDetails.splice(index, 1);
        }
        console.log('accepted users: ' + this.event.participantsDetails);

        //send info to update Event in database
        this.eventService.rejectUserParticipation(this.event.id,user.id)
            .subscribe( data => {
                console.log(JSON.stringify(data));
                this.event.people_remaining++;
            }, err => {
                this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("","Nie mogę usunąć użytkownika"))
            });
    }
}
