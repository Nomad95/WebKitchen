import {Component, OnInit} from '@angular/core';
import {EventService} from '../../events/event.service';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {SearchService} from "../search.service";
import {DetailedEvent} from "../../events/model/detailedEvent";
import {ActivatedRoute, Router} from "@angular/router";
import {PageEvents} from "../pageEvents";
import {DatePickerValues} from "../../util/datepicker/date-picker-values.model";
import {IMyDateModel} from "mydatepicker";
@Component({
    selector: 'searched-events',
    templateUrl: 'app/search/searched-events/searched-events.component.html',
    providers: [SearchService],
    directives: [ToasterContainerComponent]
})
export class SearchedEventsComponent implements OnInit {

    private pageWithEvents: PageEvents;
    private events: Array<DetailedEvent> = [];
    private routeParametr: any;
    private sub:any;

    // dependence to pagination
    private isMainSearch: boolean = true;

    //pagination variables
    private currentPage = 0;
    private numbersOfPage = [];

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

    /**
     * Intializes datepicker variables
     */
    initializeDatePickerOptions(): void{
        this.datePicker.initializeDatePickerForEvents();
        this.datePicker.addDisableUntil();
    }

    constructor(private searchService: SearchService,
                private route: ActivatedRoute){}

    ngOnInit(): void {
        this.initializeDatePickerOptions();
        this.getTitleEventsFromUrlAndSearchEventsByTitle(0);
    }

    generatePages():void{
        this.numbersOfPage = [];
        if(this.pageWithEvents.totalPages >10){
            for(var i= this.currentPage; i<this.currentPage+10; i++){
                this.numbersOfPage.push(i);
            }
        } else {
            for(var i= 0; i<this.pageWithEvents.totalPages; i++){
                this.numbersOfPage.push(i);
            }
        }


    }

    searchEventByTitle(eventTitle, numberOfPage):void{
        this.events = [];
        this.searchService.searchOnlyByTitle(eventTitle,numberOfPage, 2)
            .subscribe(result =>{
                this.pageWithEvents = result;
                for(let event of this.pageWithEvents.content){
                    this.events.push(event);
                }
                this.isMainSearch = true;
                this.generatePages();
            })
    }

    searchEventByCriteria(criteria, numberOfPage:number):void{
        this.events = [];
        this.searchService.searchEventByCriteria(criteria, numberOfPage, 2)
            .subscribe( result => {
                this.pageWithEvents = result;
                for(let event of this.pageWithEvents.content){
                    this.events.push(event)
                }
                this.isMainSearch = false;
                this.generatePages();

            })
    }


    getTitleEventsFromUrlAndSearchEventsByTitle(numberOfPage):void{
        this.sub = this.route.params.subscribe(params => {
            this.routeParametr = params['title'];

            if(this.isMainSearch && !(this.routeParametr == null || this.routeParametr == "")){
                this.criteria.title = this.routeParametr;
                this.searchEventByTitle(this.criteria, numberOfPage);
            }
        });
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

/**
    * Fetches new page data from server
* @param page
*/
    getNewPages(page){
        if(page != this.currentPage){
            this.currentPage = page;
            if(this.isMainSearch)
                this.getTitleEventsFromUrlAndSearchEventsByTitle(this.currentPage);
            else
                this.searchEventByCriteria(this.criteria, this.currentPage);
        }
    }

    getPreviousPage(){
        if(this.currentPage != 0){
            this.currentPage--;
            if(this.isMainSearch)
                this.getTitleEventsFromUrlAndSearchEventsByTitle(this.currentPage);
            else
                this.searchEventByCriteria(this.criteria, this.currentPage);
        }
    }

    getNextPage(){
        if(this.currentPage != (this.numbersOfPage.length-2) ){
            this.currentPage++;
            if(this.isMainSearch)
                this.getTitleEventsFromUrlAndSearchEventsByTitle(this.currentPage);
            else
                this.searchEventByCriteria(this.criteria, this.currentPage);
        }
    }


}