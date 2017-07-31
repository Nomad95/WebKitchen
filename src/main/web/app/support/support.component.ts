import {Component} from "@angular/core";
import {SupportService} from "./support.service";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'support',
    templateUrl: 'app/support/support.component.html',
    providers: [SupportService]
})
export class SupportComponent {

    private messageToSend = {
        title: '',
        messageContents: ''
    };

    constructor(private supportService: SupportService){}

    sendMsgFromSupport(message, form: FormGroup):void{
        this.supportService
            .sendMessageFromSupport(message)
            .subscribe(newMsg => {
                this.messageToSend;
                form.reset();
            }, error2 => console.log("błąd"));
    }

}