import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ProfileService } from './profile.service';
import { TAB_COMPONENTS  } from '../../tabs/Tabset';


@Component({
    selector: 'profile',
    templateUrl: 'app/profile/userProfile/profile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [ProfileService]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private precentageFilled: any = 0;
    private profileCompletion: number;
   
    private userProfile = {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        flatNumber: '',
        postCode: '',
        city: '',
        birthDate: '',
        phoneNumber: '',
        sex: '',
        interests: '',
        description: '',
        preferredCuisine: [],
        profileCompletion: '',
        userAccountDTO: {
          username: '',
          email: '',
          country: '',
          nick: '',
          lastLogged: '',
          isFilled: '',
          isVerified: '',
          createdAt: '',
          id: ''
        },
            id: '' 
    };
   
    constructor(private profileService: ProfileService, private _titleService: Title) { }

    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
    }

    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
    //get user account information to variable userProfile
    getProfile(): void {
        this.profileService
            .getProfile()
            .subscribe(result => {
                this.userProfile.userAccountDTO = result;
                this.profileService.setId(result.id); //pass id to profileService.id
                this.getProfileDetails();
                this._titleService.setTitle("Kuchnia po sąsiedzku - "+this.userProfile.userAccountDTO.username);
            });


    }

    //get user details information to variable userProfile
    getProfileDetails(): void {
        this.profileService
            .getProfileDetails()
            .subscribe(result => {
                this.userProfile = result;
                this.profileCompletion = +this.userProfile.profileCompletion;
                this.precentageFilled = Math.floor(this.profileCompletion * 7.2) / 1;
             
        });
    }
       getPrectangeFilled(): String{
           return this.precentageFilled.toString();
       }

    // on-destroy
    ngOnDestroy() {

    }
}
