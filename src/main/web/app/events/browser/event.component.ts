import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'event-detail',
    templateUrl: 'app/events/browser/event.component.html'
})
export class EventGeneralComponent implements OnInit {
    constructor() {
    }

    //event from all event list component
    @Input() private event: any;

    private eventType: string;

    ngOnInit() {
        this.switchTypeToNames();
    }

    /**
     * extracts event name from event type int
     */
    switchTypeToNames() {
        switch (this.event.type) {
            case 1:
                this.eventType = "Dołącz do uczty";
                break;
            case 2:
                this.eventType = "Ugotujmy coś razem";
                break;
        }
    }
}
