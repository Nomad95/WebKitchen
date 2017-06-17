import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { RegistrationService } from './registration.service';
import {UtilMethods} from "../util/util-methods.service";
import {CountriesLocalName} from "../util/countries/countriesLocalName";

@Component({
    selector: 'registration',
    templateUrl: 'app/registration/registration.component.html',
    styleUrls: ['css/hello.css'],
    providers: [RegistrationService, UtilMethods]
})
export class RegistrationComponent {
    constructor(
        private registrationService: RegistrationService,
        private router: Router,
        private utilMethods: UtilMethods) {
    }

    userAccountToAdd = {
      username: '',
      password: '',
      email: '',
      country: '',
      nick: ''
    };

    confirmPassword = '';
    acceptedRegulaions = false;
    acceptedMarketingRules = false;

    //if true, we do not show alert, on start its true
    validationResult = true;

    //means: false = accepted we do not show the error on start troche namieszane xDD
    isMarketAccepted = false;
    isRegAccepted = false;
    isPassNotEqual = false;
    passwordsDiffer = false;

    //is taken
    isUsernameTaken = false;
    isEmailTaken = false;
    isNickTaken = false;

    /**
     * list of all countries for select type
     */
    countries = CountriesLocalName.countries;

    /**
     * Perform user account creation
     * @param data
     */
    createUserAccount(data): void{
        this.validationResult = this.finalDataValidation(data);
        if (!this.validationResult) {
            return;
        }
        //perform user creation.
        this.performCreationOfUserAccount(data);
  }

    /**
     * we perform a front-end validation pass
     * @param data registration data
     * @returns {boolean} true if validation has passed properly
     */
    finalDataValidation(data):boolean {
        let result = true;

        if (!this.acceptedRegulaions) {
            this.isRegAccepted = true;
            result = false;
        }
        else {
            this.isRegAccepted = false;
        }
        if (!this.acceptedMarketingRules) {
            this.isMarketAccepted = true;
            result = false;
        }
        else {
            this.isMarketAccepted = false;
        }
        if (this.confirmPassword === data.password) {
            this.isPassNotEqual = false;
        }
        else {
            this.isPassNotEqual = true;
            return false;
        }
        return result;
    }

    /**
     * Checks whether passwords are the same
     */
    checkIfPasswordsAreSame(){
        //if user proveded two passwords check if they are different
        if(this.userAccountToAdd.password && this.confirmPassword)
            (this.userAccountToAdd.password != this.confirmPassword)
                ? this.passwordsDiffer = true : this.passwordsDiffer = false;
    }

    /**
     *
     * @returns {boolean} True if all data is unique
     */
    fieldsAreNotTaken(){
        return !(this.isEmailTaken || this.isNickTaken || this.isUsernameTaken);
    }

    /**
     * Checks if all fields are unique and then pushes data to server
     * @param data user account data
     */
    performCreationOfUserAccount(data){
        /* if we success we clear the text fields
         * if we have an error, we show a message */
        if(this.fieldsAreNotTaken()) {
            //lowercase email
            this.userAccountToAdd.email = this.toLowercase(this.userAccountToAdd.email);
            //push account data
            this.registrationService
                .createUserAccount(data)
                .subscribe(newAccount => {
                    //clear data
                    this.userAccountToAdd = {
                        username: '',
                        password: '',
                        email: '',
                        country: '',
                        nick: ''
                    };
                    this.confirmPassword = '';
                    this.isMarketAccepted = false;
                    this.isRegAccepted = false;
                    this.isPassNotEqual = false;
                    this.validationResult = true;
                    this.passwordsDiffer = false;
                    this.router.navigate(['/registration/success']);
                }, err => {
                    this.validationResult = false;
                });
        }
    }

    /**
     * Checks if username is taken
     */
    checkIfUsernameIsTaken(){
        this.registrationService.checkIfUsernameIsTaken(this.userAccountToAdd.username)
            .subscribe( res => {
                this.isUsernameTaken = res;
            });
    }

    /**
     * Checks if email is taken. Downcases it
     */
    checkIfEmailIsTaken(){
        this.registrationService.checkIfEmailIsTaken(this.toLowercase(this.userAccountToAdd.email))
            .subscribe( res => {
                this.isEmailTaken = res;
            });
    }

    /**
     * Checks if Nick is taken
     */
    checkIfNickIsTaken(){
        console.log(this.userAccountToAdd.nick);
        this.registrationService.checkIfNickIsTaken(this.userAccountToAdd.nick)
            .subscribe( res => {
                this.isNickTaken = res;
            });
    }

    /**
     * Converts string to be all letters lowercase
     * @param value string
     * @returns string all lowercase
     */
    toLowercase(value: string){
        return this.utilMethods.stringAllToLowerCase(value);
    }

    /**
     * Converts provided string to 1ts letter uppercase
     * @param value string
     * @returns string with upeprcased 1st letter
     */
    toUppercase(value: string){
        return this.utilMethods.stringToUpperCase(value);
    }
}
