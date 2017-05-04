import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable}    from 'rxjs/Observable';

import {Cuisine} from '../profile/model/cuisine.model';

@Injectable()
export class CuisinesService {
    private headers = null;
    
    constructor(private http: Http) {}
    
    getAllCuisines(){
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        

        //create appropriate
        this.headers = new Headers({
            'content-type' : 'application/json',
            'X-Auth-token' : token});
        
        //and passing them in the request
        return this.http.get('/api/cuisines/all',{headers :this.headers})
            .map((res:Response) => res.json());   
    }
    
     private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
     }
}
