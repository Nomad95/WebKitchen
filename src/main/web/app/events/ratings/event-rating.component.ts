import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../event.service';
import {LoginService} from "../../login/login.service";
import {Location} from '@angular/common';
import {ToasterContainerComponent, ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {DetailedEvent} from "../model/detailedEvent";
import {EventRating} from "../model/eventRating";
import {CommentDTO} from "../model/commentDto";

@Component({
    selector: 'event-rating',
    templateUrl: 'app/events/ratings/event-rating.component.html',
    providers: [EventService],
    directives: [ToasterContainerComponent]
})
export class EventRatingComponent implements OnInit {
    constructor(private route:ActivatedRoute,
                private router:Router,
                private eventService:EventService,
                private loginService: LoginService,
                private location: Location,
                private toasterService: ToasterService) {}

    private event = new DetailedEvent();
    private rating = new EventRating();
    private hasNotRatedYet: boolean;
    private commentToAdd = '';
    public toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    ngOnInit() {
        this.getDetailedEvent();
        this.getRating();
    }

    /**
     * Gets event information and checks if user can rate event
     *///TODO: czy user moze ocenic swoje wydarzenie?
    getDetailedEvent(): any {
        this.eventService.getDetailedEvent(+this.route.snapshot.params['id'])
            .subscribe(data => {
                    this.event = data;
                    if(this.event.acceptedIds.indexOf(Number(this.route.snapshot.queryParams['authorId'])) < 0
                        || this.event.hasEnded == false){
                        this.router.navigate(['/events', this.route.snapshot.params['id']]);
                    }
                },
                err => {
                    this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Nie udało się załadować wydarzenia"));
                });
    }


    getRating() {
        this.eventService.getRating(
            this.route.snapshot.params['id'],
            this.route.snapshot.queryParams['authorId'],
            this.route.snapshot.queryParams['ownerId']
        )
            .subscribe(data => {
                this.rating = data;
                console.log(this.rating);
                this.hasNotRatedYet = false;
            }, err => {
               this.hasNotRatedYet = true;
            })
    }

    //TODO: komentarze oddzielnie i chowanie sie przy dodaniu oceny -> dodaj do komearza date utworzenia
    addRating(){
        this.rating.event.id = this.route.snapshot.params['id'];
        this.rating.author.id = this.route.snapshot.queryParams['authorId'];
        this.rating.host.id = this.route.snapshot.queryParams['ownerId'];

        this.eventService.addRating(this.rating).subscribe( data=>{
            console.log('OK' + data);
            this.getRating();
            this.hasNotRatedYet = false;
        }, err => {
            console.log('lipka ' + err);
        })
    }

    addComment(){
        let commentDto: CommentDTO = new CommentDTO();
        commentDto.ratingId = this.rating.id;
        commentDto.user.id = this.route.snapshot.queryParams['authorId'];
        commentDto.text = this.commentToAdd;

        this.eventService.addCommentToRating(this.rating.id,commentDto)
            .subscribe(data => {
                this.rating = data;
                this.commentToAdd = '';
            }, err => {
                console.log("error: "+err);
            })
    }

}
