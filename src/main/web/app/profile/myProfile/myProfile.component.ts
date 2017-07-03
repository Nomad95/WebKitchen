import { Component, OnInit, OnDestroy, EventEmitter, ViewChild } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { SelectComponent } from "ng2-select";
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { MyProfileService } from './myProfile.service';
import { PreferedCuisineService } from './preferedCuisine.service';
import { CuisinesService } from '../../cuisines/cuisines.service';
import {Cuisine} from '../model/cuisine.model';
import {UserProfile} from '../model/userProfile.model';
import { TAB_COMPONENTS  } from '../../tabs/Tabset';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AlertComponent } from './username-changed-alert.component';

@Component({
    selector: 'profile',
    templateUrl: 'app/profile/myProfile/myProfile.component.html',
    styleUrls: ['css/tabs.css'],
    providers: [MyProfileService, PreferedCuisineService, CuisinesService]
})
export class MyProfileComponent implements OnInit {
    private isDataAvailable: boolean = false;
    private username: string;
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
    private birthDateInput: Object = { date:
        { year: '', month: '', day: '' }
    };
    private selectedBirthDateNormal: string = '';
    private selectedBirthDateTextNormal: string = '';
    private defaultYearAndMonth:string;

    gender: number;

    private userProfile = new UserProfile();

    private originalUserProfile = new UserProfile();

    //when username changed - modal confirm
    confirmResult:boolean = null;

    //file upload - profile photo
    private selectedFile: File;
    /**
     * This boolean indicates that photo extension is proper
     */
    private isProperPhoto = true;

    private profilePhotoExists = false;
    private profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile.jpg";
    private profilePhotoLoaded = false;

    constructor(private myProfileService: MyProfileService,
                private preferedCuisineService: PreferedCuisineService,
                private cuisinesService: CuisinesService,
                private dialogService:DialogService,
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
        this.myProfileService
            .getProfile()
            .subscribe(result => {
                this.userProfile.userAccountDTO = result;
                //pass userProfile.userAccountDTO.id to profileService.id
                this.myProfileService.setId(result.id);
                this.username = result.username;
                this.checkIfTheUserHasProfilePhoto(result.nick);
                this.getProfileDetails();
            });


    }
    checkIfTheUserHasProfilePhoto(nick:string){
        this.myProfileService.isProfilePhotoExists(nick).subscribe(result => {
            if(result){
                this.setUserProfilePhoto();
            }
            else this.setDefaultProfilePhoto();
            this.profilePhotoLoaded = true;
        })
    }

    setUserProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile1.jpg";
    }

    setDefaultProfilePhoto(){
        this.profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile.jpg";
    }

    //get user details information to variable userProfile
    getProfileDetails(): void {
        this.myProfileService
            .getProfileDetails()
            .subscribe(result => {
                this.userProfile = result;
                this.swappingOfReceivedDataToTheExpectedFormat();
                this.isDataAvailable=true;
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
            this.selectedBirthDateNormal = this.birthDate.getFullYear()+"-"+(this.birthDate.getMonth()+1)+"-"+this.birthDate.getDate();
            console.log("selectedBirthDateNormal: "+this.selectedBirthDateNormal);

            this.selectedBirthDateTextNormal = this.selectedBirthDateNormal;
        }
        else {
            this.birthDateInput = null;
            this.selectedBirthDateNormal = null;
            this.selectedBirthDateTextNormal = "";
        }
    }
    conversionUserProfileSexToFormRadioBoxFormatGender(){
        //cast userProfile.sex to gender radiobox
        if(this.userProfile.sex=="m")
            this.gender = 1;
        else if(this.userProfile.sex=="k")
            this.gender = 2;
        else this.gender = 0;
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

    updateProfile(): void {
        if(this.username !== this.userProfile.userAccountDTO.username){
            this.showUsernameChangedAlert();
        }
        else {
            this.preparingDataForUpdateProfile();
            this.myProfileService.updateProfile(this.userProfile).subscribe(result =>{
                this.getProfile();
            });
        }
    }

    isUsernameChanged(){
        return (this.username !== this.userProfile.userAccountDTO.username); 
    }

    showUsernameChangedAlert() {
        this.dialogService.addDialog(AlertComponent, {
        title:'Zmieniłeś login!',
        message:''}, { closeByClickingOutside:true })
        .subscribe((isConfirmed)=>{
            //Get dialog result
            this.confirmResult = isConfirmed;
            if(this.confirmResult){
                this.preparingDataForUpdateProfile();
                this.myProfileService.updateProfile(this.userProfile).subscribe(result =>{
                    if(this.myProfileService.usernameChanged) this.logout();
                    else this.getProfile();
                });
            }
            else {
                this.userProfile.userAccountDTO.username = this.username;
                this.preparingDataForUpdateProfile();
                this.myProfileService.updateProfile(this.userProfile).subscribe(result =>{
                    this.getProfile();
                });
            }
        });
    }

    preparingDataForUpdateProfile(){
        this.conversionDatePickerDateToUserProfileBirthDate();
        this.conversionFormGenderToUserProfileGender();
        this.calculatePercentageFilled();
        this.profileFilled();
        this.userProfile.profileCompletion = this.profileCompletion.toString();
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
        if(this.birthDateInput){
            return true;
        }
        else return false;
    }

    conversionFormGenderToUserProfileGender(): void{
        if(this.gender==1)
            this.userProfile.sex = "m";
        else if(this.gender==2)
            this.userProfile.sex = "k";
        else
            this.userProfile.sex = "";
    }

    calculatePercentageFilled(): void{
        this.profileCompletion = 0;
        if(this.selectedBirthDateTextNormal) this.profileCompletion+=1;
        if(this.userProfile.city) this.profileCompletion+=1;
        if(this.userProfile.description) this.profileCompletion+=1;
        if(this.userProfile.flatNumber || this.userProfile.streetNumber) this.profileCompletion+=1;
        if(this.userProfile.interests) this.profileCompletion+=1;
        if(this.userProfile.name) this.profileCompletion+=1;
        if(this.userProfile.surname) this.profileCompletion+=1;
        if(this.userProfile.phoneNumber) this.profileCompletion+=1;
        if(this.userProfile.postCode) this.profileCompletion+=1;
        if(this.userProfile.preferredCuisine.length>0) this.profileCompletion+=1;
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

    profileFilled(){
        this.userProfile.userAccountDTO.isFilled = this.isProfileFilled();

    }

    isProfileFilled(){
        return (this.precentageFilled==100);
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

    /**
     * TODO - restore profile without get request.
     */
    restoreProfile(): void{
        this.getProfile();
        this.getAllCuisines();
        console.log(JSON.stringify(this.userProfile));
    }

    /**
     * Uploads a file priovided in form
     * @param formData
     */
    uploadProfilePhoto() {
        //prevent errors when user dont provide a photo
        if(this.selectedFile == null || this.selectedFile == undefined){
            console.log('No photo data provided');
            return;
        }
        this.myProfileService.uploadProfilePhoto(this.selectedFile,this.userProfile.userAccountDTO.nick)
            .subscribe(data => {
                    console.log("photo Added");
                },
                err => {
                    console.log("error adding photo")
                });
    }

    /**
     * Sets private field "selectedFile" with file provided via form input
     * Photo is relative static img path
     * @param event event object from form
     */
    fileChangeType(event) {
        //get file list from form input (by event)
        let fileList:FileList = event.target.files;
        if (fileList.length > 0) {
            this.selectedFile = fileList[0];
            //check extention
            this.isProperPhoto = MyProfileComponent.checkFileExtension(this.selectedFile);
            if (!this.isProperPhoto) {
                console.log("Wrong file extension!");
                return;
            }
        }
    }

     /**
     * Checks wether file name has valid picture extension
     * @param file file to check ext.
     * @returns {boolean} true when valid
     */
    static checkFileExtension(file: File):boolean {
        console.log("checking extention");
        return !!(file.name.endsWith(".jpg") || file.name.endsWith(".JPG")
        || file.name.endsWith(".jpeg") || file.name.endsWith(".JPEG")
        || file.name.endsWith(".png") || file.name.endsWith(".PNG")
        || file.name.endsWith(".bmp") || file.name.endsWith(".BMP"));
    }

    public myProfilePhotoChanged(date: boolean):void {
        if(date) this.profilePhotoUrl = "/img/"+this.userProfile.userAccountDTO.nick+"/profilePhoto/profile1.jpg#" + new Date().getTime();
    }

    //logs out and redirects to '/login'
    logout(){
        this.myProfileService.removeToken();
    }



    /**
     ** TODO - original User Profile for cancel edit without get request.
     */
    setOriginalUserProfile(): void{
    }
}