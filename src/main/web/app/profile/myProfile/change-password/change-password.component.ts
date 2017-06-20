import { Component, OnInit } from '@angular/core';

import { MyProfileService } from '../myProfile.service';

@Component({
    selector: 'change-password',
    templateUrl: 'app/profile/myProfile/change-password/change-password.component.html',
    styleUrls: ['css/change-password-form.css'],
    providers: [MyProfileService]
})
export class ChangePasswordComponent implements OnInit{

    private userProfileChangePasswordDTO = {
        id: -1,
        oldPassword: '',
        newPassword: ''
    }

    constructor(private myProfileService: MyProfileService){}

    ngOnInit(){
        this.userProfileChangePasswordDTO.id = this.myProfileService.id;
    }

    changePassword(): void{
        if(this.givenOldPasswordIsCorrect()){
            this.myProfileService.changePassword(this.userProfileChangePasswordDTO);
        }
    }

    givenOldPasswordIsCorrect(){
        this.myProfileService.oldPasswordIsCorrect(this.userProfileChangePasswordDTO.oldPassword).subscribe( result =>{
            if(result){
                return true;
            }
            else return false;
        });
    }
    
}