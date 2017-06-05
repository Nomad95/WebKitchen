import {Component} from '@angular/core';
import {Router} from '@angular/router';

/**
 * shows a message when we successfully log in
 */
@Component({
    selector: 'login-success',
    templateUrl: 'app/login/login-success.component.html'
})
export class LoginSuccess {

    constructor(private router:Router) {
    }
}
