import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";
import {MessageReceived} from "../message-received";
import {SharedService} from "../../shared.service";

@Component({
    selector: 'received-messages',
    templateUrl: 'app/messages/received/received-messages.component.html',
    providers: [MessageService]
})
export class ReceivedMessagesComponent implements OnInit{
    receivedMessages: Array<MessageReceived>;
    currentIndexOfPage: number;
    private indexesOfPage = [];
    @Input() indexFirstMsgOnSite: number;
    private messagesToDelete = [];


    constructor(private router: Router, private messageService: MessageService, private sharedService: SharedService) {
    }

    ngOnInit() {
        this.setIndexOfPageFromMain();
        this.getReceivedMessage();
        console.log(this.indexFirstMsgOnSite)
    }

    getReceivedMessage(): void{
        this.messageService
            .getMyReceivedMessages()
            .subscribe( result => {
                    this.receivedMessages = result;
                    for(let res of result){
                        res.checked = false;
                    }
                    this.genereteTabForPagination(Object.keys(this.receivedMessages).length);
                    console.log(result);
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

    setIndexOfPageFromMain():void{
        if(this.indexFirstMsgOnSite == 0)
            this.currentIndexOfPage = 1;
        else
            this.currentIndexOfPage = (this.indexFirstMsgOnSite/10)+1;
        console.log("index page: " + this.currentIndexOfPage);
    }

    setIndexOfPage(number):void{
        this.currentIndexOfPage = number;

    }

    decreaseNumberOfUnreadMessage():void{
        this.sharedService.setNumberOfUnreadMessages(this.sharedService.getNumberOfUnreadMessages()-1)
    }

    deleteSelectedMessages():void{
        this.getSelectedOptions();
        for(let message of this.messagesToDelete)
            this.messageService
                .deleteMyReceivedMessage(message)
                .subscribe();
    }

    getSelectedOptions() {
        this.messagesToDelete = [];
        this.messagesToDelete = this.receivedMessages
            .filter(opt => opt.checked)
            .map(opt => opt.id);
    }
}