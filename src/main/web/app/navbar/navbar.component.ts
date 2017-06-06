import {Component, OnInit} from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import {SharedService} from "../shared.service";

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
  providers: [LoginService]
})
export class NavbarComponent implements OnInit {
  constructor(private loginService:LoginService, private router:Router, private sharedService: SharedService) {

  }

  public username = '';w

  ngOnInit(){
    //this.sharedService.getIsAdmin();
    this.loginService.isLogged();
    //this.username = this.loginService.getUsername();
  }

  getUsername():string {
    return this.loginService.getUsername();
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