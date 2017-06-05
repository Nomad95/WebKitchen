import { Component, OnInit, OnDestroy } from '@angular/core';
//import { LoginService } from './profile.service';
import { AdminPanelUEService } from './adminPanelUE.service';


import {emptyCompilationResult} from "gulp-typescript/release/reporter";
import {LoginService} from "../login/login.service";
import {SharedService} from "../shared.service";

@Component({
    selector: 'adminPanelUE',
    templateUrl: 'app/adminPanelUE/adminPanelUE.component.html',
    styleUrls: ['css/app.css'],
    providers: [AdminPanelUEService]
})
export class AdminPanelUEComponent implements OnInit, OnDestroy {
    constructor(private adminPanelUEService: AdminPanelUEService, private loginService: LoginService, private sharedService: SharedService) {}

    private role: string;
    public idAccount;
    private hideTable = false;
    private userAccountToSearch = {
        username: ''
    }
    private userAccount = {
        id:'',
        username: '',
        country: '',
        email: '',
        nick: '',
        isFilled: '',
        isVerified: '',
        id2: '',
        name: '',
        surname: ''
    };

    private banToAdd = {
        dateEndOfBan:'',
        timeEndOfBan:''
    };

    private name;
    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {

        console.log("Czy jestem adminem: "+ this.sharedService.getIsBanned());

    }

    /**
     * we check is that use
     * @returns {boolean}
     */
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
                this.userAccount.id = result.id;
                this.userAccount.username = result.username;
                this.userAccount.country = result.country;
                this.userAccount.email = result.email;
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

       createBanForUser(data): void{
           if (data.timeEndOfBan.length < 7)
               data.timeEndOfBan += ':00';
           data.dateEndOfBan += 'T00:00:00';

        this.adminPanelUEService.createBanForUser(data,this.userAccount.id).subscribe( newBan => this.banToAdd );

       }


    // on-destroy
    ngOnDestroy() {

    }
}
