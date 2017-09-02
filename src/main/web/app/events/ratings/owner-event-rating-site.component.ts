import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event.service';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {DetailedEvent} from "../model/detailedEvent";
import {EventRating} from "../model/eventRating";
import {LoginService} from "../../login/login.service";

@Component({
    selector: 'owner-event-rating',
    templateUrl: 'app/events/ratings/owner-event-rating-site.component.html',
    providers: [EventService],
    directives: [ToasterContainerComponent]
})
export class OwnerEventRatingComponent implements OnInit {
    constructor(private route:ActivatedRoute,
                private router:Router,
                private eventService:EventService,
                private toasterService: ToasterService,
                private loginService: LoginService) {}

    private userId;
    private event = new DetailedEvent();
    private ratings: EventRating[];
    public toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit() {
        this.getUserId();
        this.getDetailedEvent(this.route.snapshot.params['id']);
        this.getRatings(this.route.snapshot.params['id']);
    }

    getUserId(){
        this.loginService.getIdByUsername().subscribe(data => {
            this.userId = data;
        })
    }

    getDetailedEvent(eventId: number): any {
        this.eventService.getDetailedEvent(eventId)
            .subscribe(data => {
                    this.event = data;
                    console.log(data);
                    if(this.event.ownerId != this.userId
                        || this.event.hasEnded == false){
                        this.router.navigate(['/events', this.route.snapshot.params['id']]);
                    }
                },
                err => {
                    this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Nie udało się załadować wydarzenia"));
                });
    }

    getRatings(eventId: number){
        this.eventService.getRatingsForEvent(eventId)
            .subscribe(data => {
                this.ratings = data;
            }, err => {

            })
    }

}
