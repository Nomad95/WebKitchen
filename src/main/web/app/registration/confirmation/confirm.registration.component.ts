import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from '../registration.service';

@Component({
    selector: 'registration-confirm',
    templateUrl: 'app/registration/confirmation/confirm.registration.component.html',
    providers: [RegistrationService]
})
export class ConfirmRegistrationComponent implements OnInit{
    constructor(
        private registrationService: RegistrationService,
        private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        //extract params from URI
        this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                let token = params['token'];
                console.log(token);
                this.confirmRegistration(token);
        });
    }

    confirmRegistration(token: string){
        this.registrationService.confirmRegistration(token)
            .subscribe( res => console.log(res));
    }

}
