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

    //dont show message before data is loaded
    private dataLoaded = false;
    
    //checks is uder is enabled or not
    private isAccepted = false;
    
    ngOnInit() {
        //extract params from URI
        this.activatedRoute.queryParams
            .subscribe((params: Params) => {
                let token = params['token'];
                console.log(token);
                this.confirmRegistration(token);
        });
    }

    /**
     * perform account acceptation
     * @param token
     * returns true if user becomes 'Enabled'
     */
    confirmRegistration(token: string){
        this.registrationService.confirmRegistration(token)
            .subscribe( res => {
                this.dataLoaded = true;
                this.isAccepted = res;
            });
    }

}
