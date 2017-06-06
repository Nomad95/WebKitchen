import {Component, OnInit, Input} from '@angular/core';
import {EventService} from "../event.service";
import {Router} from '@angular/router';


@Component({
    selector: 'user-created-events',
    templateUrl: 'app/events/profile/user-created-events.component.html',
    providers: [EventService]
})
export class UserCreatedEventsComponent implements OnInit {
    constructor(private eventService: EventService, private router: Router) {
    }

    //event from parent
    @Input() private event: any;
    //private acceptedList = this.event.acceptedIds;

    ngOnInit() {
        console.log(this.event.acceptedIds);
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
                //this.acceptedList.push(userId);
                this.event.acceptedIds.push(userId);
            });
    }

    /**
     * navigates to users profile page
     * @param username of user 
     */
    goToProfile(username: string){
        this.router.navigate(['/profile/',username]);
    }
}
