import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterContainerComponent} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {EventService} from "../event.service";

@Component({
    selector: 'user-participate-events',
    templateUrl: 'app/events/profile/user-participate-events.component.html',
    directives: [ToasterContainerComponent]
})
export class UserParticipateEventsComponent implements OnInit{
    constructor(private router: Router, private eventService: EventService) {
    }

    @Input() private events: any;

    @Input() private userId: number = -1;

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit(): void {
        if(this.events){
            for (let event of this.events){
                event.hasEnded = this.isEventHasAlreadyHappened(event.id);
                console.log(event.hasEnded);
            }
        }
    }

    /**
     * navigates user to event details
     * @param eventId
     */
    goToEventDetails(eventId: number){
        this.router.navigate(['/events', eventId]);
    }

    /**
     * converts event type (number) to apropriate string
     * @param eventKind
     * @returns {any}
     */
    convertToEventKind(eventKind: number): string{
        switch (eventKind){
            case 1: return "Dołącz do uczty";
            case 2: return "Wspólne gotowanie";
        }
    }

    /**
     * checks if event has already happened
     * @param eventId
     * @returns boolean
     */
     isEventHasAlreadyHappened(eventId:number){
        this.eventService.isEventHasAlreadyHappened(eventId).subscribe(result => {
            console.log("happened: "+result);
            return result;
        })
    }
}
