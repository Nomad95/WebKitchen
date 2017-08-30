import {Component, OnInit, OnDestroy} from '@angular/core';
//import { LoginService } from './profile.service';
import {AdminService} from './admin.service';

@Component({
    selector: 'admin',
    templateUrl: 'app/admin/admin.component.html',
    providers: [AdminService]
})
export class AdminComponent implements OnInit, OnDestroy {


    constructor(private profileService: AdminService) {
    }


    private userProfile = {
        username: '',
        country: '',
        email: '',
        nick: '',
        isFilled: '',
        isVerified: ''
    }

    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
    }


    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
    getProfile(): void {
        this.profileService
            .getProfile()
            .subscribe(result => {
                // this.userProfile = JSON.stringify(result);
                this.userProfile.username = result.username;
                this.userProfile.country = result.country;
                this.userProfile.email = result.email;
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
