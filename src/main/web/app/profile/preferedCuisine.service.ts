import { Injectable } from '@angular/core';

import {Cuisine} from '../model/cuisine.model';

@Injectable()
export class PreferedCuisineService {
    private preferedCuisines: Array<Cuisine> = [];
    
    setPreferedCuisines(preferedCuisines: Array<Cuisine>){
        this.preferedCuisines=preferedCuisines;    
    }
    
    addPreferedCuisineToCuisinesArray(cuisine: any) {
        this.preferedCuisines.push(cuisine);
    }
    //show preferedCuisines array - all prefered cuisines
    getPreferedCuisines() {
        return this.preferedCuisines;
    }
    
    deletePreferedCuisineFromCuisinesArray(name: string) {
        let index: number = this.preferedCuisines[name].indexOf(name);
        if (index !== -1) {
            this.preferedCuisines[name].splice(index, 1);
            //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
        }
    }
}
