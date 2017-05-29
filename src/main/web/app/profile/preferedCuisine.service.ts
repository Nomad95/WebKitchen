import { Injectable } from '@angular/core';

import {Cuisine} from './model/cuisine.model';

@Injectable()
export class PreferedCuisineService {
    private preferedCuisines: Array<Cuisine> = [];
    public originalPreferedCuisines: Array<Cuisine> = [];
    public cuisines:Array<Cuisine> = [];
    
    setPreferedCuisines(preferedCuisines: Array<Cuisine>){
        this.preferedCuisines=preferedCuisines; 
        //console.log("pref: "+JSON.stringify(this.preferedCuisines));
        let pref = Object.assign({}, this.preferedCuisines);
        this.originalPreferedCuisines=pref; 
        for (let cuisine of this.preferedCuisines) {
            console.log("cuisine to remove: "+JSON.stringify(cuisine));
             this.deleteCuisineFromArray(cuisine.name);
            
        } 
        console.log("originalpref: "+JSON.stringify(this.originalPreferedCuisines));
    }

    restorePreferedCuisines(){
        //console.log("pref: "+JSON.stringify(this.preferedCuisines));
        let pref = Object.assign({}, this.originalPreferedCuisines);
        this.preferedCuisines=pref;
        for (let cuisine of this.preferedCuisines) {
            console.log("cuisine to remove: "+JSON.stringify(cuisine));
            this.deleteCuisineFromArray(cuisine.name);

        }
        //console.log("originalpref: "+JSON.stringify(this.originalPreferedCuisines));
    }

    /*addPreferedCuisineToCuisinesArray(cuisine: Cuisine) {
        let index: number = this.preferedCuisines.indexOf(cuisine);
        if(index<0){
            this.preferedCuisines.push(cuisine);
            this.deleteCuisineFromArray(cuisine.name);
        }*/
        addPreferedCuisineToCuisinesArray(name: string) {
        // let index: number = this.preferedCuisines[name].indexOf(name);
        // if(index<0){
        //     let index2: number = this.cuisines[name].indexOf(name)
        //    // if (index2 !== -1){
        //     this.preferedCuisines.push(this.cuisines[index]);
        for (let cuisine of this.cuisines){
            if(cuisine.name == name){
               this.preferedCuisines.push(cuisine);
                break;
            }
           // this.deleteCuisineFromArray(cuisine.name);
         //   }
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
    
    deletePreferedCuisineFromCuisinesArray(name: string) {
        for (let preferredCuisine of this.preferedCuisines){
            if(preferredCuisine.name == name){
            this.addCuisineToArray(preferredCuisine);
            let index = this.preferedCuisines.indexOf(preferredCuisine);
            this.preferedCuisines.splice(index, 1);
                break;

            //Note: If you don't check the return of indexOf() for -1, this will remove the last item from array when msg wasn't found!
        
        }
    }}
    
//    deletePreferedCuisineFromCuisinesArray.text: string) {
//        let index: number = this.preferedCuisines.text].indexOf.text);
//        if (index !== -1) {
//            this.addCuisineToArray(this.preferedCuisines[index]);
//            this.preferedCuisines.text].splice(index, 1);
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
    
    deleteCuisineFromArray(name: string){
       /* let index: number = this.cuisines.text].indexOf.text);
        console.log("index: "+index);
        if (index !== -1) {
            this.cuisines.splice(index, 1);
        }*/
        for (let cuisine of this.cuisines){
            if(cuisine.name == name){
                let index: number = this.cuisines.indexOf(cuisine);
                if (index !== -1) {
                    this.cuisines.splice(index, 1);
                }
                console.log("ilosc: "+ this.cuisines.length);
                break;
            }
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