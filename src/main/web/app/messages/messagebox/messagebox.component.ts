import {Component, OnChanges, OnInit, SimpleChange, SimpleChanges} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "../message.service";

@Component({
    selector: 'message-box',
    templateUrl: 'app/messages/messagebox/messagebox.component.html',
    providers: [MessageService]
})
export class MessageBoxComponent implements OnInit {
    private sub:any
    private indexFirstMsgOnSite;

    constructor(private route: ActivatedRoute,private router: Router, private messageService: MessageService) {
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