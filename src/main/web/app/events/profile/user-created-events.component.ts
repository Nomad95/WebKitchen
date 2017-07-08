import {Component, OnInit, Input} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from '@angular/router';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';

@Component({
    selector: 'user-created-events',
    templateUrl: 'app/events/profile/user-created-events.component.html',
    providers: [EventService],
    directives: [ToasterContainerComponent]
})
export class UserCreatedEventsComponent implements OnInit {
    constructor(private eventService: EventService,
                private router: Router,
                private toasterService: ToasterService) {
    }

    //event from parent
    @Input() private event: any;

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();


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
     */
    acceptUser(userId: number){
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

    rejectTheRequest(user){
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
