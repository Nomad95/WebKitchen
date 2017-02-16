import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
     providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(private loginService: LoginService, private router: Router) {}

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
        .subscribe( result =>{
          if(result===true){
            this.credentials = {
            username: '',
            password: ''
            };
            
            //forwards to main page
            this.router.navigate(['/']);
          }
          
          this.loginService.isLogged();
        });

    }

    // on-destroy
    ngOnDestroy() {
       
    }
}
