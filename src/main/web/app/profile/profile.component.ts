import { Component, OnInit, OnDestroy } from '@angular/core';
//import { LoginService } from './profile.service';
import { ProfileService } from './profile.service';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['css/app.css'],
     providers: [ProfileService]
})
export class ProfileComponent implements OnInit, OnDestroy {


constructor(private profileService: ProfileService) {}


  private userProfile = {
      username: '',
      country: '',
      e_mail: '',
      nick: '',
      isFilled: '',
      isVerified: ''
  };

   // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
    }

    
    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
    getProfile(): void{
     this.profileService
     .getProfile()
     .subscribe( result => {
        // this.userProfile = JSON.stringify(result);
         this.userProfile.username = result.username;
         this.userProfile.country = result.country;
         this.userProfile.e_mail = result.e_mail;
         this.userProfile.nick = result.nick;
         this.userProfile.isFilled = result.isFilled;
         this.userProfile.isVerified = result.isVerified;
        });
       // this.userProfile2 = new String (this.userProfile);
     }
    // on-destroy
    ngOnDestroy() {

    }
}
