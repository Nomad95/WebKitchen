import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {TokenUtils} from "../login/token-utils";

@Injectable()
export class CuisinesService {
    constructor(private http: Http) {}

    private headers = null;

    getAllCuisines(){
        //We get token from local storage
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
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
