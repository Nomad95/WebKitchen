import {Component, OnInit} from '@angular/core';
import {ToasterContainerComponent} from 'angular2-toaster';
import {SearchService} from "../search.service";
import {DetailedEvent} from "../../events/model/detailedEvent";
import {ActivatedRoute} from "@angular/router";
import {PageEvents} from "../pageEvents";
import {SharedService} from "../../shared.service";
@Component({
    selector: 'searched-events',
    templateUrl: 'app/search/searched-events/searched-events.component.html',
    providers: [SearchService],
    directives: [ToasterContainerComponent]
})
export class SearchedEventsComponent implements OnInit{

    private pageWithEvents: PageEvents;
    private events: Array<DetailedEvent> = [];
    private titleFromRouter: any;
    private sub:any;
    private searchType:any;

    // dependence to pagination
    private isMainSearch: boolean = true;

    //pagination variables
    private currentPage = 0;
    private numbersOfPage = [];

    private criteria ={
        title: '',
        address:'',
        date: '',
        typeEvent: ''
    };

    private criteriaReset ={
        title: '',
        address:'',
        date: '',
        typeEvent: ''
    };

    constructor(private searchService: SearchService,
                private route: ActivatedRoute,
                private sharedService: SharedService){}

    ngOnInit(): void {
        this.getTypeSearchFromUrlAndSearch(0)
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
        this.searchService.searchOnlyByTitle(eventTitle,numberOfPage, 10)
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
        this.sharedService.mapToAnotherComponent(this.criteria);
        this.searchService.searchEventByCriteria(criteria, numberOfPage, 10)
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
            this.titleFromRouter = params['title'];

            if(!(this.titleFromRouter == null || this.titleFromRouter == "")){
                this.criteria.title = this.titleFromRouter;
                this.searchEventByTitle(this.criteria, numberOfPage);
            }

        });
    }

    getTypeSearchFromUrlAndSearch(numberOfPage):void{
        this.sub = this.route.params.subscribe(params => {
            this.searchType = params['searchType'];
            if(this.searchType === "main"){
                this.getTitleEventsFromUrlAndSearchEventsByTitle(numberOfPage);
            } else if(this.searchType ==="advanced"){
                this.searchEventByCriteria(this.criteria, this.currentPage);
            }
        })
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