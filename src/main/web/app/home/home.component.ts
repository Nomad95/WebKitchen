import {Component, OnInit} from '@angular/core';
import {DetailedEvent} from "../events/model/detailedEvent";
import {HomeService} from "./home.service";

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.component.html',
    providers:[HomeService]
})
export class HomeComponent implements OnInit{

    topEvents:Array<DetailedEvent> = [];

    constructor(private homeService: HomeService){}

    ngOnInit(): void {
        this.homeService.searchTop10EventsOrderedByDate()
            .subscribe(result => {
                this.topEvents = result;
            })
    }
}
