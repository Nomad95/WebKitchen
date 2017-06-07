import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { SelectComponent } from "ng2-select";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { MyProfileService } from './myProfile.service';
import { PreferedCuisineService } from './preferedCuisine.service';
import { CuisinesService } from '../../cuisines/cuisines.service';
import {Cuisine} from '../model/cuisine.model';
import { TAB_COMPONENTS  } from '../../tabs/Tabset';


@Component({
    selector: 'profile',
    templateUrl: 'app/profile/myProfile/myProfile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [MyProfileService, PreferedCuisineService, CuisinesService]
})
export class MyProfileComponent implements OnInit, OnDestroy {
    private isDataAvailable: boolean = false;
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


    constructor(private profileService: MyProfileService,
                private preferedCuisineService: PreferedCuisineService,
                private cuisinesService: CuisinesService,
                private _titleService: Title) {
        
        this.initializeDatePickerOptions();
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

    /*
    ** on-init, get profile information, all cuisines
    ** and set page Title
    */
    ngOnInit() {
        this._titleService.setTitle("Kuchnia po sąsiedzku - mój profil");
        this.getProfile();
        this.getAllCuisines();
    }

    //get user account information to variable userProfile
    getProfile(): void {
        this.profileService
            .getProfile()
            .subscribe(result => {
                this.userProfile.userAccountDTO = result;
                //pass userProfile.userAccountDTO.id to profileService.id
                this.profileService.setId(result.id); 
                this.getProfileDetails();
            });


    }

    //get user details information to variable userProfile
    getProfileDetails(): void {
        this.profileService
            .getProfileDetails()
            .subscribe(result => {
                this.userProfile = result;
                this.swappingOfReceivedDataToTheExpectedFormat();                

                console.log("getUserProfile - USERPROFILE: "+JSON.stringify(this.userProfile));
        });
    }

    swappingOfReceivedDataToTheExpectedFormat(){
        this.setPercentageFilledBasedOnUserProfileCompletion();
        this.setPreferredCuisinesBasedOnUserProfilePreferredCuisines();
        this.conversionUserProfileBirthDateToDatePickerFormatDate();
        this.conversionUserProfileSexToFormRadioBoxFormatGender();
    }

    setPercentageFilledBasedOnUserProfileCompletion(){
        this.profileCompletion = +this.userProfile.profileCompletion;
        this.precentageFilled = this.getPercentageFilled();
    }
    setPreferredCuisinesBasedOnUserProfilePreferredCuisines(){
        this.preferredCuisinesItems=[];
        this.userProfile.preferredCuisine.forEach(prefcuisine =>{
            this.preferredCuisinesItems.push(prefcuisine.name);
            this.selectPreferredCuisinesItems.active = this.preferredCuisinesItems;})

        this.preferedCuisineService.setPreferedCuisines(this.userProfile.preferredCuisine);
    }
    conversionUserProfileBirthDateToDatePickerFormatDate(){
        if(this.userProfile.birthDate) { 
            this.birthDate = new Date(+this.userProfile.birthDate);
            this.birthDateInput = { date: 
                    { year: this.birthDate.getFullYear(), month: (this.birthDate.getMonth()+1), day: this.birthDate.getDate() } 
                };
        }
        else {
            this.birthDateInput = { date: null };
        }
    }
    conversionUserProfileSexToFormRadioBoxFormatGender(){
        //cast userProfile.sex to gender radiobox
        if(this.userProfile.sex=="m")
            this.gender = 1;
        else
            this.gender = 2;
    }

    getAllCuisines(): void{
        this.cuisinesService
        .getAllCuisines()
        .subscribe(result => {
            this.preferedCuisineService.setCuisines(result);
            this.selectedCuisine=result[0];
            this.cuisines = this.preferedCuisineService.getCuisines();
            this.isDataAvailable=true;
            this.cuisines.forEach(cuisine =>{
                this.cuisinesItems.push(cuisine.name);
                this.selectCuisinesItems.items = this.cuisinesItems;})          
        });           
    }
    
    updateProfile(): void {
        this.conversionDatePickerDateToUserProfileBirthDate();
        this.conversionFormGenderToUserProfileGender();
        this.calculatePercentageFilled();
        
        this.userProfile.profileCompletion = this.profileCompletion.toString();
        this.profileService.updateProfile(this.userProfile).subscribe(result =>{this.getProfile();});
        
    }

    conversionDatePickerDateToUserProfileBirthDate(): void{
        if(this.theCorrectDateWasSelected()){
           this.userProfile.birthDate = this.selectedBirthDateTextNormal; 
        }
        else {
           this.userProfile.birthDate = '';
        }
    }
    theCorrectDateWasSelected(){
        if(this.selectedBirthDateNormal){
            return true;
        }
        else return false;
    }

    conversionFormGenderToUserProfileGender(): void{
         if(this.gender==1)
                    this.userProfile.sex = "m";
                else
                    this.userProfile.sex = "k";
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
        
    calculatePercentageFilled(): void{
        this.profileCompletion = 0;
        if(this.userProfile.birthDate) this.profileCompletion+=1;
        if(this.userProfile.city) this.profileCompletion+=1;
        if(this.userProfile.description) this.profileCompletion+=1;
        if(this.userProfile.flatNumber || this.userProfile.streetNumber) this.profileCompletion+=1;
        if(this.userProfile.interests) this.profileCompletion+=1;
        if(this.userProfile.name) this.profileCompletion+=1;
        if(this.userProfile.surname) this.profileCompletion+=1;
        if(this.userProfile.phoneNumber) this.profileCompletion+=1;
        if(this.userProfile.postCode) this.profileCompletion+=1;
        if(this.userProfile.preferredCuisine || this.userProfile.preferredCuisine !== []) this.profileCompletion+=1;
        if(this.userProfile.sex) this.profileCompletion+=1;
        if(this.userProfile.street) this.profileCompletion+=1;
        if(this.userProfile.userAccountDTO.email) this.profileCompletion+=1;

        this.precentageFilled = this.getPercentageFilled();
        console.log(this.getPercentageFilledString());
    }
    getPercentageFilledString(): String{
        return this.precentageFilled.toString();
    }
    getPercentageFilled(): number{
        return Math.floor(this.profileCompletion*7.7) / 1;
    }
    
    /*
    ** TODO - restore profile without get request.
    */
    restoreProfile(): void{
        this.getProfile();
        this.getAllCuisines();
       console.log(JSON.stringify(this.userProfile));
    } 

    // on-destroy
    ngOnDestroy() {

    }

    /*
    ** TODO - original User Profile for cancel edit without get request.
    */
    setOriginalUserProfile(): void{ 
    }
}
