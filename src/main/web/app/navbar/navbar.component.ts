import {Component, OnInit} from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html'
})
export class NavbarComponent implements OnInit {
  constructor(private loginService:LoginService, private router:Router, private sharedService: SharedService) {

  }

 private nick = '';

  ngOnInit(){
    //this.sharedService.getIsAdmin();
    this.loginService.isLogged();
    this.getMyNick();
    //this.username = this.loginService.getUsername();
  }

  getMyNick():void{
    this.loginService.getMyNick().subscribe(result => {
      this.nick = result.nick;
    })
  }

  //just checks a token, refreshing variables
  checkToken(){
    this.loginService.isLogged();
  }

  //logs out and redirects to '/'
  logout(){
    this.loginService.removeToken();
    this.router.navigate(['/']);
  }
}