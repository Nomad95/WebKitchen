/**
 * New typescript file
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {Observable}    from 'rxjs/Observable';

@Injectable()
export class MyProfileService {
    private headers = null;
    public id: number;
    public usernameChanged = false;
    private url;
    private credentials = {
            username: '',
            oldPassword: ''
        };
    constructor(private http: Http, private router: Router) {}

    setId(id){
        this.id = id;
    }
    
    getProfile():Observable<any> {
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        

        //create appropriate
        this.headers = new Headers({
            'content-type' : 'application/json',
            'X-Auth-token' : token});
        
        //get username from the token 
        let username = currentToKey && currentToKey.username;
        console.log(username);

        
        //and passing them in the request
        return this.http.get('/api/user/account/'+username,{headers :this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    getProfileDetails():Observable<any> {
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'))
        let token = currentToKey && currentToKey.token;

        //create appropriate
        this.headers = new Headers({
            'content-type' : 'application/json',
            'X-Auth-token' : token});
   
        //and passing them in the request
        return this.http.get('/api/user/details/account/'+this.id,{headers :this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }
    
/* Update profile data from edit profile Form*/
   updateProfile(data):Observable<any> {
         var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        //get username from the token 
        let tokenUsername = currentToKey && currentToKey.username;

        //create appropriate
        this.headers = new Headers({
          'accept': 'application/json',
          'content-type' : 'application/json',
          'X-Auth-token' : token});
        console.log(JSON.stringify(data));

        if(data.userAccountDTO.username.toString() == tokenUsername.toString()){
            this.usernameChanged = false;
        }
        else{
            this.usernameChanged = true;
        }
        return this.http.put('/api/user/details/'+this.id,JSON.stringify(data),{headers :this.headers})
                .map(res => res.json())
                .catch(this.handleUpdateError);
    }

    /* Check that the given password is correct */
	oldPasswordIsCorrect(oldPassword): Observable<boolean>{
        this.credentials.oldPassword=oldPassword;
        this.credentials.username = this.getLoggedUsernameFromToken();
		return this.http.post('/auth',JSON.stringify(this.credentials),{headers :this.headers})
				.map(res => {
                // login successful if there's a jwt token in the response
                let token = res.json() && res.json().token;
                if (token) {
                    // return true if password correct
                    return true;
                } else {
                    // return false if password incorrect
                    return false;
                }
            })
				.catch(this.handleError);
	}

    getLoggedUsernameFromToken(){
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));

        //get username from the token 
        return currentToKey && currentToKey.username;
    }

    changePassword(userProfileChangePasswordDTO):Observable<any>{

        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        //create appropriate
        this.headers = new Headers({
          'accept': 'application/json',
          'content-type' : 'application/json',
          'X-Auth-token' : token});
        return this.http.put('/api/user/changePassword/'+this.id,JSON.stringify(userProfileChangePasswordDTO),{headers :this.headers})
                .map(res => res.json())
                .catch(this.handleUpdateError);
    }
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred in Profile', error);
        return Promise.reject(error.message || error);
     }

     private handleUpdateError(error: any): Promise<any> {
        console.error('An error occurred in updateProfile', error);
        return Promise.reject(error.message || error);
     }

    /* removeToken aka Logout */
	removeToken(): void{
		localStorage.removeItem('toKey');
        this.router.navigate(['/login']);
	}
}
