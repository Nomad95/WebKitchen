import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MailService} from "../mail/mail.service";

@Component({
    selector: 'support',
    templateUrl: 'app/support/support.component.html',
    providers: [MailService]
})
export class SupportComponent {

    private messageToSend = {
        title: '',
        content: ''
    };

    constructor(private mailService: MailService){}

    sendMsgFromSupport(message, form: FormGroup):void{
        console.log(this.messageToSend);
        this.mailService
            .sendMessageFromSupport(message)
            .subscribe(newMsg => {
                this.messageToSend;
                console.log("Wsio!!!");
                form.reset();
            }, error2 => console.log("Błąd poczas wysyłania maila"));
    }

}