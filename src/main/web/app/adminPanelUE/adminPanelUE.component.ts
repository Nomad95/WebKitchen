import { Component, OnInit, OnDestroy } from '@angular/core';
//import { LoginService } from './profile.service';
import { AdminPanelUEService } from './adminPanelUE.service';


import {emptyCompilationResult} from "gulp-typescript/release/reporter";

@Component({
    selector: 'adminPanelUE',
    templateUrl: 'app/adminPanelUE/adminPanelUE.component.html',
    styleUrls: ['css/app.css'],
    providers: [AdminPanelUEService]
})
export class AdminPanelUEComponent implements OnInit, OnDestroy {
    constructor(private adminPanelUEService: AdminPanelUEService ) {}

    public idAccount;
    private hideTable = false;
    private userAccountToSearch = {
        username: ''
    }
    private userAccount = {
        id:'',
        username: '',
        country: '',
        e_mail: '',
        nick: '',
        isFilled: '',
        isVerified: '',
        id2: '',
        name: '',
        surname: ''
    };

    private name;
    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {

    }


    checkBTN(): boolean{
        if(this.userAccountToSearch.username == 'NULL')
            return false;
        else
         return true;
    }
    delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


    getSearchUser(): void{
        this.name = this.userAccountToSearch.username;

        this.adminPanelUEService
            .getUserAccountByName(this.userAccountToSearch.username)
            .subscribe( result => {
                // this.userProfile = JSON.stringify(result);
                this.userAccount.id = result.id;
                this.userAccount.username = result.username;
                this.userAccount.country = result.country;
                this.userAccount.e_mail = result.e_mail;
                console.log("ID:",this.userAccount.id);
                this.idAccount = this.userAccount.id;
                this.getUserDetails();
            });
        }

        getUserDetails(): void{

            this.adminPanelUEService
                .getUserDetailsByUserAccount(this.idAccount)
                .subscribe( result2 => {
                    // this.userProfile = JSON.stringify(result);
                    this.userAccount.id2 = result2.id;
                    this.userAccount.name = result2.name;
                    this.userAccount.surname = result2.surname;
                    console.log("ID details:", this.userAccount.id2);

                });
        }

       deleteUser(): void{
        console.log("ID ACC:", this.idAccount);
        console.log("ID details:", this.userAccount.id2);
        this.adminPanelUEService
            .deleteUserDetails(this.userAccount.id2)
            .subscribe(
                result => console.log(result));
        this.userAccount.name = null;
       }

       doesUserExist(): void{
        if(this.userAccount.name != null) {
               this.hideTable = true;
           }
           else
               this.hideTable = false;
       }


    // on-destroy
    ngOnDestroy() {

    }
}
