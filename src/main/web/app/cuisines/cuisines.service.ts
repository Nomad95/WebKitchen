import { Injectable } from '@angular/core';

import {Cuisine} from '../model/cuisine.model';

@Inectable()
export class CuisinesService {
    private cuisines: Array<Cuisine> = [];
    private headers = null;
    
    loadAllCuisines(){
        //We get token from local storage
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        

        //create appropriate
        this.headers = new Headers({
            'content-type' : 'application/json',
            'X-Auth-token' : token});
        
        //and passing them in the request
        this.cuisines=this.http.get('/api/user/account/'+username,{headers :this.headers})
            .map(res => res.json());    
    }
    
    //show preferedCuisines array - all prefered cuisines
    getCuisine(name: string) {
        let index: number = this.cuisines[name].indexOf(name);
        if (index !== -1) {
            return this.cuisines[index];
        }
        return -1;
    }
}
