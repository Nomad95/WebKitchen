import {Component, Input} from '@angular/core';
import {EventService} from '../event.service';
import {ToasterContainerComponent} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../../util/toast/toast-configurer.factory";
import {CommentDTO} from "../model/commentDto";

@Component({
    selector: 'small-event-rating',
    templateUrl: 'app/events/ratings/small-event-rating.component.html',
    providers: [EventService],
    directives: [ToasterContainerComponent]
})
export class SmallEventRatingComponent {
    constructor(private eventService:EventService) {}

    @Input() private rating: any;
    @Input() private userId: any;
    private commentToAdd = '';
    public toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    addComment(){
        let commentDto: CommentDTO = new CommentDTO();
        commentDto.ratingId = this.rating.id;
        commentDto.user.id = this.userId;
        commentDto.text = this.commentToAdd;

        this.eventService.addCommentToRating(this.rating.id,commentDto)
            .subscribe(data => {
                this.rating = data;
                this.commentToAdd = '';
            }, err => {
            })
    }

}
