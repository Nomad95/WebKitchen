import { Component} from '@angular/core';
import {RegistrationService} from "../registration/registration.service";

@Component({
    selector: 'captcha',
    templateUrl: 'app/captcha-test/captcha.component.html',
    providers: [RegistrationService]
})
export class CaptchaComponent {
    constructor(private regisrationService: RegistrationService){};
    
   

}
