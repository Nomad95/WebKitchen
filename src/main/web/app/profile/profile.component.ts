import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';

import { ProfileService } from './profile.service';
import { PreferedCuisineService } from './preferedCuisine.service';
import { CuisinesService } from '../cuisines/cuisines.service';
import {Cuisine} from './model/cuisine.model';
import { SelectComponent } from "ng2-select";
import { TAB_COMPONENTS  } from '../tabs/Tabset';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/profile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [ProfileService, PreferedCuisineService, CuisinesService]
})
export class ProfileComponent implements OnInit, OnDestroy {
    private precentageFilled: any = 0;
    private cuisines:Array<Cuisine>;
    public selectedCuisine;
    public cuisinesItems:Array<any>=[];
    public preferredCuisinesItems:Array<any>=[];
    private value:any = ['Kuchnia'];
    @ViewChild('SelectId') public selectCuisinesItems: SelectComponent;
    @ViewChild('SelectId2') public selectPreferredCuisinesItems: SelectComponent;
    
    dateNow: Date = new Date();
    birthDateMax: Date = new Date();
    birthDateMin: Date = new Date();
    birthDate: Date = new Date();
    gender: number;
  
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
        this.birthDateMax.setFullYear(this.dateNow.getFullYear()-16);
        this.birthDateMin.setFullYear(this.dateNow.getFullYear()-105);
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

                this.preferredCuisinesItems=[];
                this.userProfile.preferredCuisine.forEach(prefcuisine =>{
                this.preferredCuisinesItems.push(prefcuisine.name);
                this.selectPreferredCuisinesItems.active = this.preferredCuisinesItems;})

                this.preferedCuisineService.setPreferedCuisines(this.userProfile.preferredCuisine);
              //  console.log("originalpref22222: "+JSON.stringify(this.preferedCuisineService.originalPreferedCuisines));
                this.setOriginalUserProfile();
              //  console.log(this.preferedCuisineService.getPreferedCuisines());

                //cast JSON birth date to Date - to temp birthDate
                this.birthDate = new Date(+this.userProfile.birthDate);

                //cast userProfile.sex to gender radiobox
                if(this.userProfile.sex=="m")
                    this.gender = 1;
                else
                    this.gender = 2;
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
       // console.log(JSON.stringify(this.originalUserProfile));  
    }
    
    updateProfile(): void {
        this.setBirthDate();
        this.setGender();
        this.profileService.updateProfile(this.userProfile).subscribe(result =>{this.getProfile();});
        
    }

    setBirthDate(): void{
        this.userProfile.birthDate = this.birthDate.valueOf().toString();
    }
    setGender(): void{
         if(this.gender==1)
                    this.userProfile.sex = "m";
                else
                    this.userProfile.sex = "k";
    }
    
    restoreProfile(): void{
        //poprawic
       // this.userProfile = this.originalUserProfile;  

      /*  this.userProfile.userAccountDTO.id=this.originalUserProfile.userAccountDTO.id;
        this.userProfile.userAccountDTO.username = this.originalUserProfile.userAccountDTO.username;
        this.userProfile.userAccountDTO.email = this.originalUserProfile.userAccountDTO.email;
        this.userProfile.userAccountDTO.country = this.originalUserProfile.userAccountDTO.country;
        this.userProfile.userAccountDTO.nick = this.originalUserProfile.userAccountDTO.nick;
        this.userProfile.userAccountDTO.isFilled = this.originalUserProfile.userAccountDTO.isFilled;
        this.userProfile.userAccountDTO.isVerified = this.originalUserProfile.userAccountDTO.isVerified;
        this.userProfile.userAccountDTO.lastLogged = this.originalUserProfile.userAccountDTO.lastLogged;
        this.userProfile.userAccountDTO.createdAt = this.originalUserProfile.userAccountDTO.createdAt;

        this.userProfile.id = this.originalUserProfile.id;
        this.userProfile.name = this.originalUserProfile.name;
        this.userProfile.surname = this.originalUserProfile.surname;
        this.userProfile.street = this.originalUserProfile.street;
        this.userProfile.streetNumber = this.originalUserProfile.streetNumber;
        this.userProfile.flatNumber = this.originalUserProfile.flatNumber;
        this.userProfile.postCode = this.originalUserProfile.postCode;
        this.userProfile.city = this.originalUserProfile.city;
        this.userProfile.phoneNumber = this.originalUserProfile.phoneNumber;
        this.userProfile.sex = this.originalUserProfile.sex;
        this.userProfile.interests = this.originalUserProfile.interests;
        this.userProfile.description = this.originalUserProfile.description;
        this.userProfile.preferredCuisine = this.originalUserProfile.preferredCuisine;
        this.userProfile.profileCompletion = this.originalUserProfile.profileCompletion;

        this.preferedCuisineService.restorePreferedCuisines();*/

        this.getProfile();
        this.getAllCuisines();

        //this.originalUserProfile = this.userProfile;
       console.log(JSON.stringify(this.userProfile));
    } 
    
    getAllCuisines(): void{
        this.cuisinesService
        .getAllCuisines()
        .subscribe(result => {
            this.preferedCuisineService.setCuisines(result);
            this.selectedCuisine=result[0];
            this.cuisines = this.preferedCuisineService.getCuisines(); 

            this.cuisines.forEach(cuisine =>{
                this.cuisinesItems.push(cuisine.name);
                this.selectCuisinesItems.items = this.cuisinesItems;})           
        });           
    }

  public selected(value:any):void {
      this.preferedCuisineService.addPreferedCuisineToCuisinesArray(value.text);
this.userProfile.preferredCuisine=this.preferedCuisineService.getPreferedCuisines();
    console.log('Selected value is: ', value.text);
  }
 
  public removed(value:any):void {
       this.preferedCuisineService.deletePreferedCuisineFromCuisinesArray(value.text);
    console.log('Removed value is: ', value);
  }
 
  public refreshValue(value:any):void {
    this.value = value;
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
