import {Component, OnInit} from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";
import {StompService} from "../websocket/stomp.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(private loginService:LoginService, private router:Router,
              private sharedService: SharedService, private stompService: StompService) {

  }

 private nick = '';

  ngOnInit(){
    //this.sharedService.getIsAdmin();
    this.loginService.isLogged();
    this.getMyNick();
    //this.username = this.loginService.getUsername();
  }

  getMyNick():string{
    return this.sharedService.getMyNick();
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