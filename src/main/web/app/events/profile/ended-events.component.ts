import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToasterContainerComponent} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {EventService} from "../event.service";

@Component({
    selector: 'ended-events',
    templateUrl: 'app/events/profile/ended-events.component.html',
    directives: [ToasterContainerComponent]
})
export class EndedEventsComponent implements OnInit{
    constructor(private router: Router, private eventService: EventService) {
    }

    @Input() private events: any;

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit(): void {

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

