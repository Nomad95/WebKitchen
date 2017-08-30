import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";
import {MessageReceived} from "../message-received";
import {SharedService} from "../../shared.service";
import {LoginService} from "../../login/login.service";

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
    private countUnreadMessages = {
        count:''
    };


    constructor(private router: Router,
                private messageService: MessageService,
                private sharedService: SharedService,
                private loginService: LoginService) {
    }

    ngOnInit() {
        this.setIndexOfPageFromMain();
        this.getReceivedMessage();
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
                },
                err => {}
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

    decreaseNumberOfUnreadMessage():void{
        this.sharedService.setNumberOfUnreadMessages(this.sharedService.getNumberOfUnreadMessages()-1)
    }

    deleteSelectedMessages():void{
        this.getSelectedOptions();
        // check
        var countMessage =  this.messagesToDelete.length;
        for(let message of this.messagesToDelete){
            if(countMessage == 1)
            this.messageService
                .deleteMyReceivedMessage(message)
                .subscribe(()=>{
                   this.countMyUnreadMessages();
                });
            else
                this.messageService
                    .deleteMyReceivedMessage(message)
                    .subscribe();
            countMessage--;
        }
        this.reloadPage();
    }

    getSelectedOptions() {
        this.messagesToDelete = [];
        this.messagesToDelete = this.receivedMessages
            .filter(opt => opt.checked)
            .map(opt => opt.id);
    }

    countMyUnreadMessages():void{
        this.loginService.countMyUnreadMessages().subscribe(
            result => {
                this.countUnreadMessages = result;
                this.sharedService.setNumberOfUnreadMessages(Number(this.countUnreadMessages.count));
            },
            err => {}
        );
    }
    reloadPage():void{
        var currentUrl = this.router.url;
        var refreshUrl = currentUrl.indexOf('messagebox/sent') > -1 ? '/messagebox' : 'messagebox/sent';
        this.router.navigateByUrl(refreshUrl).then(() => this.router.navigateByUrl(currentUrl));
        this.countMyUnreadMessages();
    }
}