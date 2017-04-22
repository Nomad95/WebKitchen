/**
 * New typescript file
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable}    from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    private headers = null;
    private id: any;
    
    constructor(private http: Http) {}

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
            .map(res => res.json());
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
            .map(res => res.json());
    }
    
        /* Set */
    updateProfile(data):Observable<any> {
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'))
        let token = currentToKey && currentToKey.token;

        //create appropriate
        this.headers = new Headers({
            'content-type' : 'application/json',
            'X-Auth-token' : token});
        
        //update UserDetailsDTO witch UserAccountDTO request
        return this.http.put('/api/user/details/'+this.id,JSON.stringify(data),{headers :this.headers})
                .map(res => res.json())
                .catch(this.handleError);

}
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
     }
}
