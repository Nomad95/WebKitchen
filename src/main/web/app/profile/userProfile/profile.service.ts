import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/map';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {Observable}    from 'rxjs/Observable';

@Injectable()
export class ProfileService {
    private headers = null;
    public id: number;
    private sub: any;
    private username: string;
    private itWasMyProfile: boolean = true;
    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {}

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

        //get username from url param    
        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });

        //get username from the token 
        let tokenUsername = currentToKey && currentToKey.username;

        //TODO
        if(this.itWasMyProfile){
            
        }

        //if its my profile - route to /myprofile
        if(tokenUsername == this.username){
            this.itWasMyProfile = true;
            this.router.navigate(['/profile/myprofile']);
        }
            
        //and passing them in the request
        return this.http.get('/api/user/account/'+this.username,{headers :this.headers})
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
    
    private handleError(error: any): Promise<any> {
        console.error('An error occurred in Registration', error);
        return Promise.reject(error.message || error);
     }
}
