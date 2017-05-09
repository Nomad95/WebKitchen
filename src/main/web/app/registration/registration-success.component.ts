import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

/**
 * Shows up when we sing in successfully
 */
@Component({
    selector: 'registration-success',
    templateUrl: 'app/registration/registration-success.component.html'
})
export class RegistrationSuccess {
    constructor(private router:Router) {
    }
}
