import { Injectable } from '@angular/core';

import {Cuisine} from './model/cuisine.model';

@Injectable()
export class PreferedCuisineService {
    private preferedCuisines: Array<Cuisine> = [];
    public originalPreferedCuisines: Array<Cuisine> = [];
    private cuisines:Array<Cuisine> = [];
    
    setPreferedCuisines(preferedCuisines: Array<Cuisine>){
        this.preferedCuisines=preferedCuisines; 
        //console.log("pref: "+JSON.stringify(this.preferedCuisines));
        let pref = Object.assign({}, this.preferedCuisines);
        this.originalPreferedCuisines=pref; 
        for (let cuisine of this.preferedCuisines) {
            console.log("cuisine to remove: "+JSON.stringify(cuisine));
             this.deleteCuisineFromArray(cuisine);
            
        } 
        //console.log("originalpref: "+JSON.stringify(this.originalPreferedCuisines));   
    }
    
    addPreferedCuisineToCuisinesArray(cuisine: Cuisine) {
        let index: number = this.preferedCuisines.indexOf(cuisine);
        if(index<0){
            this.preferedCuisines.push(cuisine);
            this.deleteCuisineFromArray(cuisine);
        }
             //   console.log("cuisine: "+JSON.stringify(cuisine));

        //console.log("pref: "+JSON.stringify(this.preferedCuisines));
          
         //console.log("originalpref: "+JSON.stringify(this.originalPreferedCuisines)); 
    }
    //show preferedCuisines array - all prefered cuisines
    getPreferedCuisines() {
        return this.preferedCuisines;
    }
    getOriginalPreferedCuisines() {
        return this.originalPreferedCuisines;
    }
    
    deletePreferedCuisineFromCuisinesArray(cuisine: Cuisine) {
        let index: number = this.preferedCuisines.indexOf(cuisine);
        if (index !== -1) {
            this.addCuisineToArray(this.preferedCuisines[index]);
            this.preferedCuisines.splice(index, 1);
            //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
        
        }
    }
    
//    deletePreferedCuisineFromCuisinesArray(name: string) {
//        let index: number = this.preferedCuisines[name].indexOf(name);
//        if (index !== -1) {
//            this.addCuisineToArray(this.preferedCuisines[index]);
//            this.preferedCuisines[name].splice(index, 1);
//            //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
//        
//        }
//    }
    
    setCuisines(cuisines:Array<Cuisine>){
        this.cuisines=cuisines;
    }
    getCuisines(){
        return this.cuisines;
    }
    
    addCuisineToArray(cuisine: Cuisine){
        this.cuisines.push(cuisine);
        console.log("zzzzzzadd: "+JSON.stringify(this.cuisines));
    }
    
    deleteCuisineFromArray(cuisine: Cuisine){
        let index: number = this.cuisines.indexOf(cuisine);
        console.log("index: "+index);
        if (index !== -1) {
            this.cuisines.splice(index, 1);
        }
       // console.log("zzzzzzdelete: "+JSON.stringify(this.cuisines));
    }
//    findIndexInArray(c2){
//        c2= new Object(c2);
//        for(var i =0;i<this.cuisines.length;i++){
//           var c1= new Object(this.cuisines[i]);
//           if(c2==c1) return i;  
//        }
//        return -1;
//    }
}
