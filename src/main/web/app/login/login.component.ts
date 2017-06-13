import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service"; //<==== this one


@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html'
})
export class LoginComponent {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private sharedService: SharedService) {}

    nazwa;//?

    private myBan = {
        dateEndOfBan: '',
        timeEndOfBan: ''
    };

    //username and password
    credentials = {
      username: '',
      password: ''
    };

    errorEncountered = false;
    private statusBan : String;
    private role :String;


    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     * then if login has been positive we check role of user and
     * is not an banned account
     */
    logins(credentials):void {
        this.loginService
            .getToken(credentials)
            .subscribe(result => {
                if (result === true) {
                    this.credentials = {
                        username: '',
                        password: ''
                    };
                    this.loginService.checkIsUserBanned().subscribe(result => {
                        this.statusBan = result.status;
                        if (this.statusBan == "true") {
                            this.sharedService.setIsBanned(true);
                            console.log("Sprawdzanie bana" + this.sharedService.getIsBanned());
                            this.getInfoAboutMyBan();
                            this.loginService.removeToken();
                        }
                        else if (this.statusBan == "false") {
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


    checkIsUserAnAdmin():void {
        this.loginService.checkIsUserAnAdmin().subscribe(result => {
            this.role = result.role;
            if (this.role == "user") {
                this.sharedService.setIsAdmin(false);
            }
            else if (this.role == "admin") {
                this.sharedService.setIsAdmin(true);
            }

        });
    }

    getInfoAboutMyBan():void {
        this.loginService.getInfoAboutMyBan().subscribe(
            result => {
                this.myBan = result;
                console.log("Data: " + this.myBan.dateEndOfBan + " godzina: " + this.myBan.timeEndOfBan);
                this.router.navigate(['/login/banned/', {
                    date: this.myBan.dateEndOfBan,
                    time: this.myBan.timeEndOfBan
                }]);

            },
            err => console.log('Wystąpił błąd podczas pobierania informacji o banie')
        );
    }

}
