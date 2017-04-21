import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'registration-success',
    templateUrl: 'app/registration/registration-success.component.html'
})
export class RegistrationSuccess implements OnInit {

    constructor(private router:Router) {
    }

    // on-init
    ngOnInit() {

    }

}
