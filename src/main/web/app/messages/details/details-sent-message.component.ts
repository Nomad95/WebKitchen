import {ActivatedRoute, Route, Router} from "@angular/router";
import {MessageService} from "../message.service";
import {Component, OnInit} from "@angular/core";
@Component({
    selector: 'details-sent-messages',
    templateUrl: 'app/messages/details/details-sent-message.component.html',
    providers: [MessageService]
})
export class DetailsSentMessagesComponent implements OnInit{
    private id: number
    private sub: any;
    private message = {
        title: '',
        messageContents: '',
        dateOfSend: '',
        wasRead: '',
        sender:{
            nick:''
        }
    }

    constructor(private route: ActivatedRoute,private router: Router, private messageService: MessageService) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });
        this.getMessageDetails();
    }


    getMessageDetails():void{
        this.messageService
            .getSentMessageDetails(this.id)
            .subscribe( result =>{
                    result.dateOfSend = new Date(result.dateOfSend).toDateString();
                    this.message = result;
                }

            )
    }
}