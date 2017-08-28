import {Component} from "@angular/core";
import {SearchService} from "../search.service";

@Component({
    selector: 'advanced-search',
    templateUrl:'app/search/advanced-search/advanced-search.component.html',
    providers: [SearchService]
})
export class AdvancedSearchComponent {
    constructor(private searchService: SearchService){
    }

}