import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { SelectComponent } from "ng2-select";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { MyProfileService } from './myProfile.service';
import { PreferedCuisineService } from './preferedCuisine.service';
import { CuisinesService } from '../../cuisines/cuisines.service';
import {Cuisine} from '../model/cuisine.model';
import { TAB_COMPONENTS  } from '../../tabs/Tabset';
import {EventService} from '../../events/event.service';
import {LoginService} from '../../login/login.service';


@Component({
    selector: 'profile',
    templateUrl: 'app/profile/myProfile/myProfile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [MyProfileService, PreferedCuisineService, CuisinesService, EventService, LoginService]
})
export class MyProfileComponent implements OnInit, OnDestroy {
    private precentageFilled: any = 0;
    private profileCompletion: number;
    private cuisines:Array<Cuisine>;
    public selectedCuisine;
    public cuisinesItems:Array<any>=[];
    public preferredCuisinesItems:Array<any>=[];
    private value:any = ['Kuchnia'];
    @ViewChild('SelectId') public selectCuisinesItems: SelectComponent;
    @ViewChild('SelectId2') public selectPreferredCuisinesItems: SelectComponent;
    
    dateNow: Date = new Date();
    maxBirthYear: number = this.dateNow.getFullYear()-16;
    minBirthYear: number = this.dateNow.getFullYear()-105;
    maxBirthDate: Date = new Date(this.dateNow.setFullYear(this.maxBirthYear));
   
    private birthDateInputValue="";
    
    private myDatePickerOptions: IMyDpOptions;
    private birthDate: Date;
    private birthDateInput: Object;
    private selectedBirthDateNormal: string = '';
    private selectedBirthDateTextNormal: string = '';
    private defaultYearAndMonth:string;

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

    private userId = -1;
    private userEvents: any[];
    private userParticipatedEvents: any[];

    constructor(private profileService: MyProfileService,
                private preferedCuisineService: PreferedCuisineService,
                private cuisinesService: CuisinesService,
                private eventService: EventService,
                private loginService: LoginService,
                private _titleService: Title) { }

    // private userProfile2: string;
    // on-init, get profile information
    ngOnInit() {
        this.getProfile();
        this.getAllCuisines();
        this.initializeDatePickerOptions();
        this.getUserEvents();
        this.getUserEventsWhichHeParticipatesIn();
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
                this.userProfile.userAccountDTO = result;
                this.profileService.setId(result.id); //pass id to profileService.idthis.userProfile.userAccountDTO.id
                this.getProfileDetails();
                this._titleService.setTitle("Kuchnia po sąsiedzku - mój profil");
            });


    }

    //get user details information to variable userProfile
    getProfileDetails(): void {
        this.profileService
            .getProfileDetails()
            .subscribe(result => {
                this.userProfile = result;
               console.log("getUserProfile - USERPROFILE: "+JSON.stringify(this.userProfile));
                this.profileCompletion = +this.userProfile.profileCompletion;
                this.precentageFilled = Math.floor(this.profileCompletion * 7.2) / 1;

                this.preferredCuisinesItems=[];
                this.userProfile.preferredCuisine.forEach(prefcuisine =>{
                    this.preferredCuisinesItems.push(prefcuisine.name);
                    this.selectPreferredCuisinesItems.active = this.preferredCuisinesItems;})

                this.preferedCuisineService.setPreferedCuisines(this.userProfile.preferredCuisine);
              //  console.log("originalpref22222: "+JSON.stringify(this.preferedCuisineService.originalPreferedCuisines));
                this.setOriginalUserProfile();
              //  console.log(this.preferedCuisineService.getPreferedCuisines());
                //cast JSON birth date to Date - to temp birthDate
                if(this.userProfile.birthDate) { 
                    this.birthDate = new Date(+this.userProfile.birthDate);
                   /*this.birthDateInputValue="birthDate | date: 'yyyy-MM-dd'"*/
                   console.log("year: "+this.birthDate.getFullYear()+", month: "+(this.birthDate.getMonth()+1)+", day: "+this.birthDate.getDay());
                    this.birthDateInput = { date: { year: this.birthDate.getFullYear(), month: (this.birthDate.getMonth()+1), day: this.birthDate.getDate() } };
                }
                else {
                    /*this.birthDate = null;
                    this.birthDateInputValue = "";*/
                    this.birthDateInput = { date: null };
                }
                console.log("getProfile - birthDate: "+this.birthDate);
                console.log("getProfile - birthDateInputValue: "+this.birthDateInputValue);
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

    initializeDatePickerOptions(): void{
        this.myDatePickerOptions = {
            // other options...
            minYear: <number> this.minBirthYear,
            maxYear: <number> this.maxBirthYear,
            indicateInvalidDate: true,
            showTodayBtn: false,
            openSelectorTopOfInput: true,
            markCurrentYear: false,
            allowDeselectDate: true,
            disableSince: {year: this.maxBirthDate.getFullYear(), month: this.maxBirthDate.getMonth()+1, day: this.maxBirthDate.getDate()+1}
        };
        this.defaultYearAndMonth = this.maxBirthDate.getFullYear()+"-"+(this.maxBirthDate.getMonth()+1);
    }
    
    updateProfile(): void {
        this.setBirthDate();
        this.setGender();
        this.setPercentageFilled();
        
        this.userProfile.profileCompletion = this.profileCompletion.toString();
        this.profileService.updateProfile(this.userProfile).subscribe(result =>{this.getProfile();});
        
    }

    onDateChanged(event: IMyDateModel) {
        if(event.formatted !== '') {
            this.selectedBirthDateNormal = event.formatted;
             this.selectedBirthDateTextNormal = this.selectedBirthDateNormal;
        }
        else {
            this.selectedBirthDateTextNormal = '';
        }
        console.log(this.selectedBirthDateNormal);
        
    }

    setBirthDate(): void{
        
        if(this.selectedBirthDateNormal){
           this.userProfile.birthDate = this.selectedBirthDateTextNormal;
          
    }
        else {
           this.userProfile.birthDate = '';
        }
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
    
    
       setPercentageFilled(): void{
           this.profileCompletion = 0;
           if(this.userProfile.birthDate) this.profileCompletion+=1;
           if(this.userProfile.city) this.profileCompletion+=1;
           if(this.userProfile.description) this.profileCompletion+=1;
           if(this.userProfile.flatNumber) this.profileCompletion+=1;
           if(this.userProfile.interests) this.profileCompletion+=1;
           if(this.userProfile.name) this.profileCompletion+=1;
           if(this.userProfile.surname) this.profileCompletion+=1;
           if(this.userProfile.phoneNumber) this.profileCompletion+=1;
           if(this.userProfile.postCode) this.profileCompletion+=1;
           if(this.userProfile.preferredCuisine || this.userProfile.preferredCuisine !== []) this.profileCompletion+=1;
           if(this.userProfile.sex) this.profileCompletion+=1;
           if(this.userProfile.street) this.profileCompletion+=1;
           if(this.userProfile.streetNumber) this.profileCompletion+=1;
           if(this.userProfile.userAccountDTO.email) this.profileCompletion+=1;
           this.precentageFilled = Math.floor(this.profileCompletion*7.2) / 1;
           console.log(this.precentageFilled.toString());
       }

       getPrectangeFilled(): String{
           console.log(this.precentageFilled.toString());
           return this.precentageFilled.toString();
       }

        /**
     * gets all events made by user
     */
    private getUserEvents(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.eventService.getUserEventsAndParticipants(data).subscribe( events => {
                    this.userEvents = events;
                    console.log("events: "+ this.userEvents);
                });
            });
    }

    /**
     * gets all events which user participates in
     */
    private getUserEventsWhichHeParticipatesIn(){
        this.loginService.getIdByUsername()
            .subscribe( data => {
                this.userId = data;
                this.eventService.getUserEventsWhichHeParticipates(this.userId).subscribe( events => {
                    this.userParticipatedEvents = events;
                    console.log("events: "+ this.userParticipatedEvents);
                });
            });
    }
    

    // on-destroy
    ngOnDestroy() {

    }
}
