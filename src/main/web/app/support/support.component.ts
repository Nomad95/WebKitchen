import {Component, OnInit} from "@angular/core";
import {SupportService} from "./support.service";

@Component({
    selector: 'support',
   // templateUrl: 'app/notifications/notification.component.html',
    providers: [SupportService]
})
export class SupportComponent implements OnInit  {


    ngOnInit(): void {
    }
}