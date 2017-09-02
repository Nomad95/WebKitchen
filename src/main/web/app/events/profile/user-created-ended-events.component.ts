import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {ToasterContainerComponent} from 'angular2-toaster';

@Component({
    selector: 'user-created-ended-events',
    templateUrl: 'app/events/profile/user-created-ended-events.component.html',
    directives: [ToasterContainerComponent]
})
export class UserCreatedEndedEventsComponent {
    constructor(private router: Router) {
    }

    //event from parent
    @Input() private events: any;

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    goToEventDetails(eventId: number){
        this.router.navigate(['/events', eventId]);
    }

    goToRatingSite(eventId: number){
        this.router.navigate(['events/rating/owners', eventId])
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
