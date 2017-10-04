import { Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import { ProfileService } from './profile.service';
import {UserProfile} from '../model/userProfile.model';


@Component({
    selector: 'profile',
    templateUrl: 'app/profile/userProfile/profile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [ProfileService]
})
export class ProfileComponent implements OnInit{
    private isDataAvailable: boolean = false;
    private precentageFilled: any = 0;
    private profileCompletion: number;

    private userProfile:UserProfile = new UserProfile();

    private profilePhotoLoaded = false;
    private profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile.jpg?" + new Date().getTime();

    constructor(private profileService: ProfileService, private _titleService: Title) { }

    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
    }

    //get user account information to variable userProfile
    getProfile(): void {
        this.profileService
            .getProfile()
            .subscribe(result => {
                this.userProfile.userAccountDTO = result;
                this.profileService.setId(result.id); //pass id to profileService.id
                this.getProfileDetails();
                this.checkIfTheUserHasProfilePhoto(result.nick);
                this._titleService.setTitle("Kuchnia po sąsiedzku - "+this.userProfile.userAccountDTO.nick);
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
                this.isDataAvailable=true;
        });
    }

    getPrectangeFilledString(): String{
        return this.precentageFilled.toString();
    }

    checkIfTheUserHasProfilePhoto(nick:string){
        this.profileService.isProfilePhotoExists(nick).subscribe(result => {
            if(result){
                this.setUserProfilePhoto();
            }
            else this.setDefaultProfilePhoto();
            this.profilePhotoLoaded = true;
        })
    }

    setUserProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile1.jpg?" + new Date().getTime();
    }

    setDefaultProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile.jpg";
    }

}
