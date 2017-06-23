import {Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'user-participate-events',
    templateUrl: 'app/events/profile/user-participate-events.component.html'
})
export class UserParticipateEventsComponent  {
    constructor(private router: Router) {
    }

    @Input() private events: any;
    
    @Input() private userId: number = -1;
    
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
}
