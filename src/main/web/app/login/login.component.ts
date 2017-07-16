import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service"; //<==== this one
import {StompService} from "../websocket/stomp.service"; //<==== this one
import {ToasterContainerComponent} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    directives: [ToasterContainerComponent]
})
export class LoginComponent {

    constructor(
        private loginService: LoginService,
        private router: Router,
        private sharedService: SharedService,
        private stompService: StompService) {}

    nazwa;//?

    private toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

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
    private isAccountEnabled = true;
    
    //user selects if he wants to be allways logged
    private shouldBeRemembered: boolean;

    private countUnreadMessages = {
        count:''
    };
    private countUnreadNotifications = {
        count:''
    };

    /**
     * First, we check if user account is enabled(user has clicked on activation link), if not print error.
     * If account is enabled then
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     * then if login has been positive we check role of user and
     * is not an banned account
     */
    logins(credentials):void {
        //check if account is enabled
        this.loginService.checkIfUserIsEnabled(credentials.username).subscribe(data => {
            if(data === true){
                this.loginService
                    .getToken(credentials,this.shouldBeRemembered)
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
                            this.isAccountEnabled = true;
                            this.getMyNickAndConnectWithStomp();
                            this.countMyUnreadMessages();
                            this.countMyUnreadNotifications();

                            //forwards to success page
                            this.router.navigate(['/login/success']);
                        } else {
                            this.errorEncountered = true;
                        }

                        this.loginService.isLogged();
                    }, error => {
                        this.errorEncountered = true;
                    });
            }
            else {
                this.isAccountEnabled = false;
            }
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

    getMyNickAndConnectWithStomp():void{
        this.loginService.getMyNick().subscribe(result =>{
                this.sharedService.setMyNick(result.nick);
                this.stompService.connect('ws://localhost:8080/stomp', this.sharedService.getMyNick());
            }, err => console.log("You hasn't nick ??")
        );
    }

    countMyUnreadMessages():void{
        this.loginService.countMyUnreadMessages().subscribe(
            result => {
                this.countUnreadMessages = result;
                this.sharedService.setNumberOfUnreadMessages(Number(this.countUnreadMessages.count));
            },
            err => console.log("An error occurred while retrieving count of unread message")
        );
    }

    countMyUnreadNotifications():void{
        this.loginService.countMyUnreadNotifications().subscribe(
            result => {
                this.countUnreadNotifications = result;
                this.sharedService.setNumberOfUnreadNotifications(Number(this.countUnreadNotifications.count));
            },
            err => console.log("An error occurred while retrieving count of unread notifications")
        );
    }
}
