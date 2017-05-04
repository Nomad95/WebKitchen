import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProfileService } from './profile.service';
import { PreferedCuisineService } from './preferedCuisine.service';
import { CuisinesService } from '../cuisines/cuisines.service';
import {Cuisine} from './model/cuisine.model';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['css/app.css'],
    providers: [ProfileService, PreferedCuisineService, CuisinesService]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private precentageFilled: any = 0;
    private cuisines:Array<Cuisine>;
    public selectedCuisine;
  
//    private userProfile: UserProfile;
//    private originalUserProfile: UserProfile;
 private userProfile = {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        flatNumber: '',
        postCode: '',
        city: '',
        birthDate: '',
        phoneNumber: '',
        sex: '',
        interests: '',
        description: '',
        preferredCuisine: [],
        profileCompletion: '',
        userAccountDTO: {
          username: '',
          email: '',
          country: '',
          nick: '',
          lastLogged: '',
          isFilled: '',
          isVerified: '',
          createdAt: '',
          id: ''
        },
            id: '' 
    };
    
     private originalUserProfile = {
        name: '',
        surname: '',
        street: '',
        streetNumber: '',
        flatNumber: '',
        postCode: '',
        city: '',
        birthDate: '',
        phoneNumber: '',
        sex: '',
        interests: '',
        description: '',
        preferredCuisine: [],
        profileCompletion: '',
        userAccountDTO: {
          username: '',
          email: '',
          country: '',
          nick: '',
          lastLogged: '',
          isFilled: '',
          isVerified: '',
          createdAt: '',
          id: ''
        },
            id: '' 
    };
    constructor(private profileService: ProfileService, 
                private preferedCuisineService: PreferedCuisineService,
                private cuisinesService: CuisinesService) { }

    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
        this.getAllCuisines();
    }


    /**
     * we do post on /auth and get a token
     * token is preserved in browser local storage
     */
    //get user account information to variable userProfile
    getProfile(): void {
        this.profileService
            .getProfile()
            .subscribe(result => {
                this.userProfile.userAccountDTO.id = result.id;
                this.userProfile.userAccountDTO.username = result.username;
                this.userProfile.userAccountDTO.email = result.email;
                this.userProfile.userAccountDTO.country = result.country;
                this.userProfile.userAccountDTO.nick = result.nick;
                this.userProfile.userAccountDTO.isFilled = result.isFilled;
                this.userProfile.userAccountDTO.isVerified = result.isVerified;
                this.userProfile.userAccountDTO.lastLogged = result.lastLogged;
                this.userProfile.userAccountDTO.createdAt = result.createdAt;
                this.profileService.setId(result.id); //pass id to profileService.idthis.userProfile.userAccountDTO.id
                this.getProfileDetails();
            });


    }

    //get user details information to variable userProfile
    getProfileDetails(): void {
        this.profileService
            .getProfileDetails()
            .subscribe(result => {
                this.userProfile.id = result.id;
                this.userProfile.name = result.name;
                this.userProfile.surname = result.surname;
                this.userProfile.street = result.street;
                this.userProfile.streetNumber = result.streetNumber;
                this.userProfile.flatNumber = result.flatNumber;
                this.userProfile.postCode = result.postCode;
                this.userProfile.city = result.city;
                this.userProfile.birthDate = result.birthDate;
                this.userProfile.phoneNumber = result.phoneNumber;
                this.userProfile.sex = result.sex;
                this.userProfile.interests = result.interests;
                this.userProfile.description = result.description;
                this.userProfile.preferredCuisine = result.preferredCuisine;
                this.userProfile.profileCompletion = result.profileCompletion;
                
                this.preferedCuisineService.setPreferedCuisines(this.userProfile.preferredCuisine);
                console.log("originalpref22222: "+JSON.stringify(this.preferedCuisineService.originalPreferedCuisines));
                this.setOriginalUserProfile();
                console.log(this.preferedCuisineService.getPreferedCuisines());
        });
    }
    
    setOriginalUserProfile(): void{
        this.originalUserProfile.userAccountDTO.id = this.userProfile.userAccountDTO.id;
        this.originalUserProfile.userAccountDTO.username = this.userProfile.userAccountDTO.username;
        this.originalUserProfile.userAccountDTO.email = this.userProfile.userAccountDTO.email;
        this.originalUserProfile.userAccountDTO.country = this.userProfile.userAccountDTO.country;
        this.originalUserProfile.userAccountDTO.nick = this.userProfile.userAccountDTO.nick;
        this.originalUserProfile.userAccountDTO.isFilled = this.userProfile.userAccountDTO.isFilled;
        this.originalUserProfile.userAccountDTO.isVerified = this.userProfile.userAccountDTO.isVerified;
        this.originalUserProfile.userAccountDTO.lastLogged = this.userProfile.userAccountDTO.lastLogged;
        this.originalUserProfile.userAccountDTO.createdAt = this.userProfile.userAccountDTO.createdAt;
     
        this.originalUserProfile.id = this.userProfile.id;
        this.originalUserProfile.name = this.userProfile.name;
        this.originalUserProfile.surname = this.userProfile.surname;
        this.originalUserProfile.street = this.userProfile.street;
        this.originalUserProfile.streetNumber = this.userProfile.streetNumber;
        this.originalUserProfile.flatNumber = this.userProfile.flatNumber;
        this.originalUserProfile.postCode = this.userProfile.postCode;
        this.originalUserProfile.city = this.userProfile.city;
        this.originalUserProfile.phoneNumber = this.userProfile.phoneNumber;
        this.originalUserProfile.sex = this.userProfile.sex;
        this.originalUserProfile.interests = this.userProfile.interests;
        this.originalUserProfile.description = this.userProfile.description;
        this.originalUserProfile.preferredCuisine = this.userProfile.preferredCuisine;
        this.originalUserProfile.profileCompletion = this.userProfile.profileCompletion;
        
        //this.originalUserProfile = this.userProfile; 
        console.log(JSON.stringify(this.originalUserProfile));  
    }
    
    updateProfile(): void {
        this.profileService.updateProfile(this.userProfile).subscribe(result =>{this.getProfile();});
        
    }
    
    restoreProfile(): void{
        //poprawic
       // this.userProfile = this.originalUserProfile;  
        
       console.log(JSON.stringify(this.originalUserProfile));
    } 
    
    getAllCuisines(): void{
        this.cuisinesService
        .getAllCuisines()
        .subscribe(result => {
           // this.cuisines=result; 
           // console.log(this.cuisines);
            this.preferedCuisineService.setCuisines(result);
            this.selectedCuisine=result[0];
            this.cuisines = this.preferedCuisineService.getCuisines();
        });  
           
    }
    addPreferedCuisine(): void{
        this.preferedCuisineService.addPreferedCuisineToCuisinesArray(this.selectedCuisine);
        this.userProfile.preferredCuisine=this.preferedCuisineService.getPreferedCuisines();
    }
    
    deletePreferedCuisine(prefered: Cuisine) {
//        let index: number = this.userProfile.preferredCuisine[name].indexOf(name);
//        if (index !== -1) {
//            this.userProfile.preferredCuisine[name].splice(index, 1);
        //  }
        console.log("jjjjjjj"+JSON.stringify(prefered.name)); 
        this.preferedCuisineService.deletePreferedCuisineFromCuisinesArray(prefered);
            //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
      
    }
    
     //show preferedCuisines array - all prefered cuisines
//    getCuisine(name: string) {
//        let index: number = this.cuisines[name].indexOf(name);
//        if (index !== -1) {
//            return this.cuisines[index];
//        }
//        return -1;
//    }
    
    
    
    //    getPercentageFilled{
    //        
    //        
    //    }
    
    // on-destroy
    ngOnDestroy() {

    }
}
