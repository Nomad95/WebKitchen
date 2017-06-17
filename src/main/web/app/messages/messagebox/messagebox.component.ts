import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {MessageService} from "../message.service";

@Component({
    selector: 'message-box',
    templateUrl: 'app/messages/messagebox/messagebox.component.html',
    providers: [MessageService]
})
export class MessageBoxComponent implements OnInit {

    constructor(private router: Router, private messageService: MessageService) {
    }

    ngOnInit() {

    }

}
