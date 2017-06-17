import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";
import {Message} from "../message";

@Component({
    selector: 'sent-messages',
    templateUrl: 'app/messages/sent/sent-messages.component.html',
    providers: [MessageService]
})
export class SentMessagesComponent implements OnInit {

    private sentMessages: Array<Message>;
    private currentIndexOfPage = 1;
    private indexesOfPage = [];
    private indexFirstMsgOnSite = 0;

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {
        this.getSentMessage();
    }

    getSentMessage(): void{
        this.messageService
            .getMySentMessages()
            .subscribe( result => {
                    for(let message of result){
                        message.dateOfSend = new Date(message.dateOfSend).toDateString();
                    }
                    this.sentMessages = result;
                    this.genereteTabForPagination(Object.keys(this.sentMessages).length);
                },
                err => console.log("Nie ma żadnych odebranych wiadomości")
            );
    }

    // generate list with number of pages
    genereteTabForPagination(numberMessage):void{
        var i=0;
        if(numberMessage<11)
            this.indexesOfPage.push(1);
        else{
            for(i=10;i<=numberMessage;){
                this.indexesOfPage.push(i/10);
                i+=10;
            }
            if(numberMessage%10!=0)
                this.indexesOfPage.push(i/10);
        }
    }
}

