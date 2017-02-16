import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/login.service';

@Component({
    selector: 'spring-boot-angular2',
    templateUrl: 'app/app.component.html',
    styleUrls: ['css/app.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [LoginService]
})
export class AppComponent implements OnInit{
    name = 'spring-boot-angular2';

    constructor(private loginService: LoginService, private router: Router){ }

    ngOnInit(){

    }

}
