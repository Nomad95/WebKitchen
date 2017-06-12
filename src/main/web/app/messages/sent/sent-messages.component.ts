import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";

@Component({
    selector: 'sent-messages',
    templateUrl: 'app/messages/sent/sent-messages.component.html',
    providers: [MessageService]
})
export class SentMessagesComponent implements OnInit {

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {

    }

}

