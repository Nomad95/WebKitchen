import {Component} from '@angular/core';
import {Router} from '@angular/router';

/**
 * shows a message when the user which want to log in is banned
 */
@Component({
    selector: 'login-banned-user',
    templateUrl: 'app/login/login-banned-user.component.html'
})
export class LoginBanned {

    constructor(private router:Router) {
    }
}
