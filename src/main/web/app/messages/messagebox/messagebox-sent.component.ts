import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../message.service";

@Component({
    selector: 'message-box-sent',
    templateUrl: 'app/messages/messagebox/messagebox-sent.component.html',
    providers: [MessageService]
})
export class MessageBoxSentComponent implements OnInit {
    private sub:any
    private indexFirstMsgOnSite;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getIndexFirstMsg();

    }

    getIndexFirstMsg():void{
        this.sub = this.route.params.subscribe(params => {
            var index = +params['indexFirstMsg']
            if(index>0)
                this.indexFirstMsgOnSite = index;
            else
                this.indexFirstMsgOnSite = 0;
        });
    }

    resetIndexFirstMsg():void{
        this.indexFirstMsgOnSite = 0;
    }
}