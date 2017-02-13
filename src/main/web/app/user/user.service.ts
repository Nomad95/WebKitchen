/**
 * New typescript file
 */
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

    constructor(private _http: Http) {}

    getTest() {
    	this.token=localStorage.getItem('toKey');

    	this.headers = new Headers({
    		'content-type' : 'application/json',
    		'X-Auth-token' : this.token
    	});

    	console.log(this.headers);

        return this._http.get('/api/user/all',{headers :this.headers})
            .map((res:Response) => res.json());
    }
}
 