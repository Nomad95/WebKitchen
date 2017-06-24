import { Component, OnInit, Input } from '@angular/core';

import { MyProfileService } from '../myProfile/myProfile.service';

@Component({
    selector: 'change-password',
    templateUrl: 'app/profile/changePassword/change-password.component.html',
    styleUrls: ['css/change-password-form.css'],
    providers: [MyProfileService]
})
export class ChangePasswordComponent implements OnInit{

    @Input() id: '';
    private invalidPasswordMessage: string = "";
    private confirmPassword: '';
    private oldPassword: '';
    private isPassNotEqual = false;
    private passwordChanged = false;

    private userProfileChangePasswordDTO = {
        id: '',
        newPassword: ''
    }

    constructor(private myProfileService: MyProfileService){}

    ngOnInit(){
        
    }

    checkIsPassEquals(event: any){
        if (this.confirmPassword == this.userProfileChangePasswordDTO.newPassword)
            this.isPassNotEqual = false;
        else this.isPassNotEqual = true;
    }

    changePassword(): void{
        if(this.confirmPassword === this.userProfileChangePasswordDTO.newPassword){
            this.isPassNotEqual = false;
            this.givenOldPasswordIsCorrect().then(resolve => { 
                if(resolve){
                 console.log("Good old password!!!");
                this.myProfileService.changePassword(this.userProfileChangePasswordDTO).subscribe(result => { 
                    this.passwordChanged = true;
                    this.oldPassword = '';
                    this.confirmPassword = '';
                    this.userProfileChangePasswordDTO.newPassword = '';
                });}
                else{this.passwordChanged = false;}
                
            }).catch(()=>{});
        }
        else{
            this.isPassNotEqual = true;
        }
        
           
        }
        
    

    givenOldPasswordIsCorrect(){
        return new Promise((resolve, reject) => {
            this.myProfileService.oldPasswordIsCorrect(this.oldPassword).subscribe( result =>{
                if(result){
                    console.log("result = true");
                    console.log("id = "+this.id);
                    this.invalidPasswordMessage = "";
                    this.userProfileChangePasswordDTO.id = this.id;          
                    resolve(true);
                }
                else {
                    this.invalidPasswordMessage = "Aktualne hasło nieprawidłowe, popraw i spróbuj ponownie";
                    resolve(false);
                }
            });
        });
    } 
    cancel(){
        /*this.oldPassword = null;
        this.confirmPassword = null;
        this.userProfileChangePasswordDTO.newPassword = null;*/
    }
}