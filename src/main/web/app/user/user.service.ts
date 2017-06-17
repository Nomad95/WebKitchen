/**
 * New typescript file
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
    private headers = null;

    constructor(private _http: Http) {}

    getTest() {
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
    	let token = currentToKey && currentToKey.token;

        //create appropriate
    	this.headers = new Headers({
    		'content-type' : 'application/json',
    		'X-Auth-token' : token
    	});

        //and passing them in the request
        return this._http.get('/api/user/all',{headers :this.headers})
            .map((res:Response) => res.json());
    }
}
 