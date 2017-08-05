import {Component} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MailService} from "../mail/mail.service";
import {ToasterContainerComponent, ToasterService} from "angular2-toaster";
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";

@Component({
    selector: 'support',
    templateUrl: 'app/support/support.component.html',
    providers: [MailService],
    directives: [ToasterContainerComponent]
})
export class SupportComponent {

    private messageToSend = {
        title: '',
        content: ''
    };
    public toasterConfig = ToastConfigurerFactory.basicToastConfiguration();

    constructor(private mailService: MailService,
                private toasterService: ToasterService){}

    sendMsgFromSupport(message, form: FormGroup):void{
        if(this.validateMsg()){
            document.getElementById("supportSubmit").innerText = "Wysyłanie...";
            this.mailService
                .sendMessageFromSupport(message)
                .subscribe(newMsg => {
                        this.messageToSend;
                        document.getElementById("supportSubmit").innerText = "Wyślij";
                        this.toasterService.pop(ToastConfigurerFactory.successSimpleMessage("","Wiadomość została wysłana !"));
                        form.reset();
                    }, error2 =>{
                        console.log("Błąd poczas wysyłania maila");
                        this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("", "Wiadomość nie wysłana. Spróbuj ponownie."))
                    }

                );
        }
        else{
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("", "Nie wysłano wiadomości z powodu braku tytułu lub błędnej treści"));
        }

    }

    validateMsg():boolean{
        if(this.messageToSend.content == '' || this.messageToSend.title == "")
            return false;
        else
            return true;
    }

}