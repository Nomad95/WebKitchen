import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAccount } from './user-account';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'registration',
    templateUrl: 'app/registration/registration.component.html',
    styleUrls: ['css/hello.css'],
    providers: [RegistrationService]
})
export class RegistrationComponent implements OnInit, OnDestroy {
    userAccountToAdd = {
      username: '',
      password: '',
      e_mail: '',
      country: '',
      nick: ''
  }
    confirmPassword = '';
    acceptedRegulaions = false;
    acceptedMarketingRules = false;
    //if true, we do not show alert, on start its true
    validationResult = true;
    //means false = accepted we do not show the error on start troche namieszane xDD
    isMarketAccepted = false;
    isRegAccepted = false;
    isPassNotEqual = false;


    // constructor
    constructor(private registrationService: RegistrationService) {}

    // on-init
    ngOnInit() {

    }

    createUserAccount(data): void{
        this.validationResult = this.finalDataValidation(data);

        if (!this.validationResult) {
            return;
        }

      this.registrationService
        .createUserAccount(data)
        .subscribe(newAccount => {
            this.userAccountToAdd = {
                  username: '',
                  password: '',
                  e_mail: '',
                  country: '',
                  nick: ''
            };
            this.confirmPassword = '';
            this.isMarketAccepted = false;
            this.isRegAccepted = false;
            this.isPassNotEqual = false;
            this.validationResult = true;

        });
  }

    //TODO: przekieruj do innej stronki czy coś
    finalDataValidation(data):boolean {
        let result = true;

        if (!this.acceptedRegulaions) {
            this.isRegAccepted = true;
            result = false;
        }
        else {
            this.isRegAccepted = false;
        }
        if (!this.acceptedMarketingRules) {
            this.isMarketAccepted = true;
            result = false;
        }
        else {
            this.isMarketAccepted = false;
        }
        if (this.confirmPassword === data.password) {
            this.isPassNotEqual = false;
        }
        else {
            this.isPassNotEqual = true;
            return false;
        }
        return result;
    }

    // on-destroy
    ngOnDestroy() {

    }
}
