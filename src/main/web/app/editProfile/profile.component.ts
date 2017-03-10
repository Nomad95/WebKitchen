import { Component, OnInit, OnDestroy } from '@angular/core';
//import { LoginService } from './profile.service';
import { Router } from '@angular/router';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['css/app.css'],
   //  providers: [ProfileService]
})
export class ProfileComponent implements OnInit, OnDestroy {



    // on-init
    ngOnInit() {
    }

    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
   
    // on-destroy
    ngOnDestroy() {
       
    }
}
