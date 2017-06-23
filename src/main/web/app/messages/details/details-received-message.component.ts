import {ActivatedRoute, Route, Router} from "@angular/router";
import {MessageService} from "../message.service";
import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'details-received-messages',
    templateUrl: 'app/messages/details/details-received-message.component.html',
    providers: [MessageService]
})
export class DetailsReceivedMessagesComponent implements OnInit{
    private id: number;
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
            .getReceivedMessageDetails(this.id)
            .subscribe( result =>{
                    console.log(result.messageContents);
                    this.message = result;
                }
            )
    }

}