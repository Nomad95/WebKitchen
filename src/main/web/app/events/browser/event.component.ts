import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'event-detail',
    templateUrl: 'app/events/browser/event.component.html'
})
export class EventGeneralComponent implements OnInit {
    constructor(private router:Router) {
    }

    @Input() private event:any;
    private eventType:string;
    // on-init
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
