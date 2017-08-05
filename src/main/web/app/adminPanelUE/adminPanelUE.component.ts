import {Component, OnInit, OnDestroy} from '@angular/core';
//import { LoginService } from './profile.service';
import {AdminPanelUEService} from './adminPanelUE.service';


import {emptyCompilationResult} from "gulp-typescript/release/reporter";
import {LoginService} from "../login/login.service";
import {SharedService} from "../shared.service";
import {Response} from "@angular/http";

@Component({
    selector: 'adminPanelUE',
    templateUrl: 'app/adminPanelUE/adminPanelUE.component.html',
    styleUrls: ['css/app.css'],
    providers: [AdminPanelUEService]
})
export class AdminPanelUEComponent implements OnInit, OnDestroy {
    constructor(private adminPanelUEService: AdminPanelUEService, private loginService: LoginService, private sharedService: SharedService) {
    }

    private role: string;
    public idAccount;
    private hideTableUser = true;
    private hideTableEvent = true;
    private searchingUserExist = true;
    private searchingEventExist = true;
    private searchingUserDelete = false;
    private searchingEventDelete = false;
    private userHasBeenBanned = false;
    private userAccountToSearch = {
        username: ''
    }
    private eventToSearch = {
        title: ''
    }
    private userAccount = {
        id: '',
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
        dateEndOfBan: '',
        timeEndOfBan: ''
    };

    private event = {
        id: '',
        type: '',
        title: '',
        time: '',
        date: '',
        dish_name: '',
        dish_kind: '',
        people_quantity: '',
        people_remaining: ''
    }

    private name;

    ngOnInit() {

    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getSearchUser(): void {
        this.name = this.userAccountToSearch.username;

        this.adminPanelUEService
            .getUserAccountByName(this.userAccountToSearch.username)
            .subscribe(result => {
                this.userAccount.id = result.id;
                this.userAccount.username = result.username;
                this.userAccount.country = result.country;
                this.userAccount.email = result.email;
                this.idAccount = this.userAccount.id;
                this.getUserDetails();
                this.doesUserExist();
            }, err => {
                this.searchingUserExist = false;
                this.hideTableUser = true;
                this.searchingUserDelete = false;
            });
    }

    getUserDetails(): void {

        this.adminPanelUEService
            .getUserDetailsByUserAccount(this.idAccount)
            .subscribe(result2 => {
                // this.userProfile = JSON.stringify(result);
                this.userAccount.id2 = result2.id;
                this.userAccount.name = result2.name;
                this.userAccount.surname = result2.surname;
            });
    }

    deleteUser(): void {
        this.adminPanelUEService
            .deleteUserDetails(this.userAccount.id2)
            .subscribe( result => {
                    this.hideTableUser = true;
                    this.searchingUserDelete = true;
                });
    }

    doesUserExist(): void {
        if (this.userAccount.id != '') {
            this.hideTableUser = false;
            this.searchingUserExist = true;
        }
        else
            this.hideTableUser = true;
        this.searchingUserDelete = false;
    }

    createBanForUser(data): void {
        if (data.timeEndOfBan.length < 7)
            data.timeEndOfBan += ':00';
        data.dateEndOfBan += 'T00:00:00';

        this.adminPanelUEService.createBanForUser(data, this.userAccount.id)
            .subscribe(newBan => {
                this.banToAdd;
                this.userHasBeenBanned = true;
            },
                error2 => {
                this.userHasBeenBanned = false;
                } );

    }

    getSearchEventDetailsByTitle(): void {
        this.adminPanelUEService.getEventDetailsByTitle(this.eventToSearch.title)
            .subscribe(result => {
                this.event = result;
                this.doesEventExist();
                this.event.date = new Date(this.event.date).toDateString();
                this.searchingEventDelete = false;
            }, err => {
                this.hideTableEvent = true;
                this.searchingEventExist = false;
                this.searchingEventDelete = false;
            });
    }

    deleteEvent(): void {
        this.adminPanelUEService
            .deleteEvent(this.event.id)
            .subscribe( result => {
                this.hideTableEvent = true;
                this.searchingEventDelete = true;
            });
    }

    doesEventExist(): void {
        if (this.event.id != '') {
            this.hideTableEvent = false;
            this.searchingEventExist = true;
        }
        else
            this.hideTableEvent = true;
    }


    // on-destroy
    ngOnDestroy() {

    }
}
