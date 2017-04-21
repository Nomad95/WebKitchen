import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'login-success',
    templateUrl: 'app/login/login-success.component.html'
})
export class LoginSuccess {

    constructor(private router:Router) {
    }
}
