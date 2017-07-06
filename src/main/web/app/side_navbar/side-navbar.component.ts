import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";
import {StompService} from "../websocket/stomp.service";

@Component({
    selector: 'side-navbar',
    templateUrl: 'app/side_navbar/side-navbar.component.html',
    styleUrls: ['css/sidebar.css']
})
export class SideNavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router,
              private sharedService: SharedService, private stompService: StompService){

  }

  ngOnInit(){
    this.loginService.isLogged();
  }

  //just checks a token, refreshing variables
  checkToken(){
    this.loginService.isLogged();
  }

   //logs out and redirects to '/'
  logout(){
    this.sharedService.setIsAdmin(false);
    this.loginService.removeToken();
    this.stompService.disconnectStomp();
    this.router.navigate(['/']);
  }
    
}
