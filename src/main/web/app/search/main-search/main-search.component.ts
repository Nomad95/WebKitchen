import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'main-search',
    templateUrl:'app/search/main-search/main-search.component.html',
})
export class MainSearchComponent {

    private model ={
        title: '',
    };
    constructor(private router: Router){
    }

}