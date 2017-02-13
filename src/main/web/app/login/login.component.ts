import { Component, OnInit, OnDestroy } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { LoginService } from './login.service';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
     providers: [LoginService, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(private loginService: LoginService, location: Location) {}

    credentials = {
      username: '',
      password: ''
    }

    // on-init
    ngOnInit() {
    }

    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
    login(credentials): void{
      this.loginService
        .getToken(credentials)
        .subscribe( newToken =>{
          localStorage.setItem('toKey', JSON.stringify(newToken.token));
          this.credentials = {
            username: '',
            password: ''
          };

        }

    }

    // on-destroy
    ngOnDestroy() {
       
    }
}
