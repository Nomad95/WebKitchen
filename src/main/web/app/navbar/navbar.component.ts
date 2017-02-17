import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: 'app/navbar/navbar.component.html',
     providers: [LoginService]
})
export class NavbarComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router){

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
    this.loginService.removeToken();
    this.router.navigate(['/']);
  }
    
}
