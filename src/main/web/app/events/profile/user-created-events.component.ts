import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'user-created-events',
    templateUrl: 'app/events/profile/user-created-events.component.html'
})
export class UserCreatedEventsComponent implements OnInit {
    constructor() {
    }
    
    @Input() private event: any;
    
    ngOnInit() {
    }

}
