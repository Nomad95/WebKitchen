import {Component, OnInit} from "@angular/core";
import {SearchService} from "../search.service";
import {DatePickerValues} from "../../util/datepicker/date-picker-values.model";
import {IMyDateModel} from "mydatepicker";
import {Router} from "@angular/router";
import {SharedService} from "../../shared.service";

@Component({
    selector: 'advanced-search',
    templateUrl:'app/search/advanced-search/advanced-search.component.html',
    providers: [SearchService]
})
export class AdvancedSearchComponent implements OnInit{
    private advanced = "advanced";

    private objectWithDate = {
        date:''
    };

    private criteria ={
        title: '',
        address:'',
        date: '',
        typeEvent: ''
    };

    /**
     * Needed for proper date picker input type
     * @type {DatePickerValues}
     */
    private datePicker = new DatePickerValues();


    constructor(private searchService: SearchService,
                private router: Router,
                private sharedService: SharedService){
    }


    ngOnInit(): void {
        this.initializeDatePickerOptions();
    }

    /**
     * Intializes datepicker variables
     */
    initializeDatePickerOptions(): void{
        this.datePicker.initializeDatePickerForEvents();
        this.datePicker.addDisableUntil();
    }

    onDateChanged(event: IMyDateModel) {
        if(event.formatted !== '') {
            this.criteria.date = event.formatted;
        } else if(this.objectWithDate.date !== '') {
            this.criteria.date = this.objectWithDate.date;
        }
        else {
            this.criteria.date = '';
        }
    }

    redirectToSearchComponent():void{
        this.sharedService.mapToSharedService(this.criteria);
        if(!(this.router.url === '/searched/events;searchType=advanced'))
            this.router.navigate(['/searched/events', {searchType: this.advanced}]);
        else
           this.reloadPage();
    }

    reloadPage():void{
        var currentUrl = this.router.url;
        var refreshUrl = currentUrl.indexOf('/') > -1 ? '/' : '/home';
        this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));
    }
}