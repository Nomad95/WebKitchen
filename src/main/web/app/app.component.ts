import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login/login.service';

@Component({
    selector: 'kuchnia-po-sasiedzku',
    templateUrl: 'app/app.component.html',
    styleUrls: ['css/app.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [LoginService]
})
export class AppComponent implements OnInit{
    name = 'kuchnia-po-sasiedzku';

    constructor(private loginService: LoginService, private router: Router){ }

    ngOnInit(){

    }

}
