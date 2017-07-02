import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";
import {MessageSent} from "../message-sent";

@Component({
    selector: 'sent-messages',
    templateUrl: 'app/messages/sent/sent-messages.component.html',
    providers: [MessageService]
})
export class SentMessagesComponent implements OnInit {

    private sentMessages: Array<MessageSent>;
    private currentIndexOfPage;
    private indexesOfPage = [];
    @Input() indexFirstMsgOnSite: number;
    private messagesToDelete = [];

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {
        this.setIndexOfPageFromMain();
        this.getSentMessage();
    }

    getSentMessage(): void{
        this.messageService
            .getMySentMessages()
            .subscribe( result => {
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
    setIndexOfPageFromMain():void{
        if(this.indexFirstMsgOnSite == 0)
            this.currentIndexOfPage = 1;
        else
            this.currentIndexOfPage = (this.indexFirstMsgOnSite/10)+1;
    }

    setIndexOfPage(number):void{
        this.currentIndexOfPage = number;

    }

    deleteSelectedMessages():void{
        this.getSelectedOptions();
        for(let message of this.messagesToDelete)
            this.messageService
                .deleteMySentMessage(message)
                .subscribe();
        this.reloadPage();
    }

    getSelectedOptions() {
        this.messagesToDelete = [];
        this.messagesToDelete = this.sentMessages
            .filter(opt => opt.checked)
            .map(opt => opt.id);
    }

    reloadPage():void{
        var currentUrl = this.router.url;
        var refreshUrl = currentUrl.indexOf('messagebox/0') > -1 ? '/messagebox' : 'messagebox/0';
        this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));
    }
}
