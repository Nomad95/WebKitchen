import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login/login.service';
import {SharedService} from "./shared.service";

@Component({
    selector: 'kuchnia-po-sasiedzku',
    templateUrl: 'app/app.component.html',
    styleUrls: ['css/app.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [LoginService]
})
export class AppComponent implements OnInit {
    name = 'kuchnia-po-sasiedzku';
    private statusBan: String;
    private role: String;
    private myBan = {
        dateEndOfBan: '',
        timeEndOfBan: ''
    };

    constructor(private loginService: LoginService, private router: Router, private sharedService: SharedService) {
    }

    ngOnInit() {
        if(this.loginService.isLogged()) {
            this.checkIsUserAnAdmin();
            this.ifUserHasBannedLogOut();
        }

    }

    ifUserHasBannedLogOut(): void {
        this.loginService.checkIsUserBanned().subscribe(result => {
            this.statusBan = result.status;
            if (this.statusBan == "true") {
                this.sharedService.setIsBanned(true);
                this.getInfoAboutMyBan();
                this.loginService.removeToken();
            }
            else if (this.statusBan == "false") {
                this.sharedService.setIsBanned(false);
            }

        });
        if (this.sharedService.getIsBanned())
            this.loginService.removeToken();
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
                console.log("Data: " + this.myBan.dateEndOfBan + " godzina: " + this.myBan.timeEndOfBan);
                this.router.navigate(['/login/banned/',{date: this.myBan.dateEndOfBan, time: this.myBan.timeEndOfBan}]);
            },
            err => console.log('Wystąpił błąd podczas pobierania informacji o banie')
        );

    }

}
