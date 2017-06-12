import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessageService} from "../message.service";

@Component({
    selector: 'received-messages',
    templateUrl: 'app/messages/messagebox/received-messages.component.html',
    providers: [MessageService]
})
export class ReceivedMessagesComponent implements OnInit {

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {

    }

}

