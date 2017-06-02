import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'user-participate-events',
    templateUrl: 'app/events/profile/user-participate-events.component.html'
})
export class UserParticipateEventsComponent implements OnInit {
    constructor() {
    }

    @Input() private event: any;
    
    ngOnInit() {
    }

}
