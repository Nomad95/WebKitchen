import {Component} from "@angular/core";

@Component({
    selector: 'main-search',
    templateUrl:'app/search/main-search/main-search.component.html',
})
export class MainSearchComponent {
    private main = "main";

    private model ={
        title: '',
    };
    constructor(){
    }


}