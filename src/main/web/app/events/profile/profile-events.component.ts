import {Component, OnInit} from '@angular/core';
import {EventService} from '../event.service';
import {LoginService} from '../../login/login.service';

@Component({
    selector: 'profile-events',
    templateUrl: 'app/events/profile/profile-events.component.html',
    providers: [EventService, LoginService]
})
export class ProfileEventsComponent implements OnInit {
    constructor(
        private eventService: EventService,
        private loginService: LoginService) {
    }

    private userId = -1;

    ngOnInit() {
        this.getUserId();
    }

    /**
     * Gets user id from token username TODO: pobraniedanych i wyswietlenie 
     */
    private getUserId(){
        this.loginService.getIdByUsername()
            .subscribe( data => this.userId = data);
    }

}
