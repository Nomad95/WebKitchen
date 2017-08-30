import {Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

/**
 * shows a message when the user which want to log in is banned
 */
@Component({
    selector: 'login-banned-user',
    templateUrl: 'app/login/login-banned-user.component.html'
})
export class LoginBanned implements OnInit{

    private sub: any;
    private dateHelper: any;

    private myBan = {
        dateEndOfBan: '',
        timeEndOfBan: ''
    };

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            this.dateHelper = +params['date'];
            this.myBan.dateEndOfBan = new Date(this.dateHelper).toDateString();
            this.myBan.timeEndOfBan = params['time'];// (+) converts string 'id' to a number
        });
    }

}
