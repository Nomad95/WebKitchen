import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service"; //<==== this one


@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
     providers: [LoginService]
})
export class LoginComponent implements OnInit, OnDestroy {

    constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) {}

    nazwa;

    credentials = {
      username: '',
      password: ''
    };
    errorEncountered = false;
    private statusBan : String;
    private role :String;

    // on-init
    ngOnInit() {
    }

    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     * then if login has been positive we check role of user and
     * is not an account banned
     */
    logins(credentials):void {
      this.loginService
        .getToken(credentials)
        .subscribe( result =>{
          if(result===true){
            this.credentials = {
                username: '',
                password: ''

            };
              this.loginService.checkIsUserBanned().subscribe(result => {
                  this.statusBan = result.status;
                  if(this.statusBan == "true"){
                      this.sharedService.setIsBanned(true);
                      console.log("Sprawdzanie bana" + this.sharedService.getIsBanned());
                      this.router.navigate(['/login/banned']);
                      this.loginService.removeToken();
                  }
                  else if(this.statusBan == "false"){
                      this.sharedService.setIsBanned(false);
                      console.log("Sprawdzanie bana" + this.sharedService.getIsBanned());
                  }

              });
              this.checkIsUserAnAdmin();
              this.errorEncountered = false;

            //forwards to main page
              this.router.navigate(['/login/success']);
          } else {
              this.errorEncountered = true;
          }

          this.loginService.isLogged();
        }, error => {
            this.errorEncountered = true;
        });

    }
    checkIsUserAnAdmin():void{
    this.loginService.checkIsUserAnAdmin().subscribe(result => {
        this.role = result.role;
        if(this.role == "user") {
            this.sharedService.setIsAdmin(false);
        }
        else if(this.role == "admin") {
            this.sharedService.setIsAdmin(true);
        }

    });
   }

    // on-destroy
    ngOnDestroy() {

    }
}
