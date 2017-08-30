import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login/login.service';
import {SharedService} from "./shared.service";
import {StompService} from "./websocket/stomp.service";

@Component({
    selector: 'kuchnia-po-sasiedzku',
    templateUrl: 'app/app.component.html',
    encapsulation: ViewEncapsulation.None,
    providers: [LoginService,StompService]
})
export class AppComponent implements OnInit {
    name = 'kuchnia-po-sasiedzku';
    private statusBan: String;
    private role: String;
    private myBan = {
        dateEndOfBan: '',
        timeEndOfBan: ''
    };
    private countUnreadMessages = {
        count:''
    };

    private countUnreadNotifications = {
        count:''
    };
    public serverResponse: string;

    constructor(private loginService: LoginService,
                private router: Router,
                private sharedService: SharedService,
                private stompService: StompService ) {

    }

    ngOnInit() {
        if(this.loginService.isLogged()) {
            this.getMyNickAndConnectWithStomp();
            this.checkIsUserAnAdmin();
            this.ifUserHasBannedLogOut();
            this.countMyUnreadMessages();
            this.countMyUnreadNotifications();
            this.stompService.getObservable().subscribe(payload => {
                this.serverResponse = payload.message;
                if (this.serverResponse === "newMessage")
                    this.countMyUnreadMessages();
                else if (this.serverResponse === "ban")
                    this.ifUserHasBannedLogOut();
                else if (this.serverResponse == "newNotification")
                    this.countMyUnreadNotifications();
            });
        }

    }

    ifUserHasBannedLogOut(): void {
        this.loginService.checkIsUserBanned().subscribe(result => {
            this.statusBan = result.status;
            if (this.statusBan == "true") {
                this.sharedService.setIsBanned(true);
                this.getInfoAboutMyBan();
                this.loginService.removeToken();
                this.stompService.disconnectStomp();
            }
            else if (this.statusBan == "false") {
                this.sharedService.setIsBanned(false);
            }

        });
        if (this.sharedService.getIsBanned()){
            this.loginService.removeToken();
            this.stompService.disconnectStomp();
        }

    }

    checkIsUserAnAdmin(): void {
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

    getInfoAboutMyBan():void{
        this.loginService.getInfoAboutMyBan().subscribe(
            result =>{
                this.myBan = result;
                this.router.navigate(['/login/banned/',{date: this.myBan.dateEndOfBan, time: this.myBan.timeEndOfBan}]);
            },
            err => {}
        );

    }
    countMyUnreadMessages():void{
        this.loginService.countMyUnreadMessages().subscribe(
            result => {
                this.countUnreadMessages = result;
                this.sharedService.setNumberOfUnreadMessages(Number(this.countUnreadMessages.count));
            },
            err => {}
        );
    }

    getMyNickAndConnectWithStomp():void{
        this.loginService.getMyNick().subscribe(result =>{
            this.sharedService.setMyNick(result.nick);
            this.stompService.connect('ws://localhost:8080/stomp', this.sharedService.getMyNick());
        }, err => {}
        );
    }

    countMyUnreadNotifications():void{
        this.loginService.countMyUnreadNotifications().subscribe(
            result => {
                this.countUnreadNotifications = result;
                this.sharedService.setNumberOfUnreadNotifications(Number(this.countUnreadNotifications.count));
            },
            err => {}
        );
    }


}