import { Injectable } from '@angular/core';

import {Cuisine} from '../model/cuisine.model';

@Injectable()
export class PreferedCuisineService {
    private preferedCuisines: Array<Cuisine> = [];
    public originalPreferedCuisines: Array<Cuisine> = [];
    public cuisines:Array<Cuisine> = [];

    setPreferedCuisines(preferedCuisines: Array<Cuisine>){
        this.preferedCuisines=preferedCuisines;
        let pref = Object.assign({}, this.preferedCuisines);
        this.originalPreferedCuisines=pref;
        for (let cuisine of this.preferedCuisines) {
             this.deleteCuisineFromCuisinesArray(cuisine.name);

        }
    }

    restorePreferedCuisines(){
        let pref = Object.assign({}, this.originalPreferedCuisines);
        this.preferedCuisines=pref;
        for (let cuisine of this.preferedCuisines) {
            this.deleteCuisineFromCuisinesArray(cuisine.name);

        }
    }

    addPreferedCuisineToCuisinesArray(name: string) {
        for (let cuisine of this.cuisines){
            if(cuisine.name == name){
               this.preferedCuisines.push(cuisine);
                break;
            }
        }
    }

    //show preferedCuisines array - all prefered cuisines
    getPreferedCuisines() {
        return this.preferedCuisines;
    }

    getOriginalPreferedCuisines() {
        return this.originalPreferedCuisines;
    }

    deletePreferedCuisineFromCuisinesArray(name: string) {
        for (let preferredCuisine of this.preferedCuisines){
            if(preferredCuisine.name == name){
                this.addCuisineToArray(preferredCuisine);
                let index = this.preferedCuisines.indexOf(preferredCuisine);
                if (index !== -1) {
                    this.preferedCuisines.splice(index, 1);
                } //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
                break;
            }
        }
    }

    setCuisines(cuisines:Array<Cuisine>){
        this.cuisines=cuisines;
    }

    getCuisines(){
        return this.cuisines;
    }

    addCuisineToArray(cuisine: Cuisine){
        this.cuisines.push(cuisine);
    }

    deleteCuisineFromCuisinesArray(name: string){
        for (let cuisine of this.cuisines){
            if(cuisine.name == name){
                let index: number = this.cuisines.indexOf(cuisine);
                if (index !== -1) {
                    this.cuisines.splice(index, 1);
                }//Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
                break;

            }
        }
    }
}