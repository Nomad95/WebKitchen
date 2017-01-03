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
      login: '',
      password: '',
      e_mail: '',
      country: '',
      nick: ''
  }


    // constructor
    constructor(private registrationService: RegistrationService) {}

    // on-init
    ngOnInit() {
      
    }

    createUserAccount(data): void{
      this.registrationService
        .createUserAccount(data)
        .subscribe(newAccount => {
            this.userAccountToAdd = {
                  login: '',
                  password: '',
                  e_mail: '',
                  country: '',
                  nick: ''
              }});
  }

    // on-destroy
    ngOnDestroy() {
       
    }
}
