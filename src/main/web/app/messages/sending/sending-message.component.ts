import {MessageService} from "../message.service";
import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

interface Nicks {
    nick: string;
}

@Component({
    selector: 'sending-message',
    providers: [MessageService],
    templateUrl: 'app/messages/sending/sending-message.component.html'
})
export class SendingMessageComponent implements OnInit {

    private messageToSend = {
        title: '',
        dateOfSend: '',
        messageContents: ''
    };
    private recipient_nick;
    private hasBeenSent;
    private hasNotBeenSent;
    private recipientExist: boolean;
    private recipientNotExist: boolean;

    private listOfNick: Array<Nicks> =[];

    constructor(private messageService: MessageService) {
    }

    ngOnInit() {
        this.getAllNicks();
    }

    sendMessageToUser(message, form: FormGroup):void{
        this.messageService
            .sendMessage(message, this.recipient_nick)
            .subscribe( newMessage =>{
                this.messageToSend;
                this.hasBeenSent = true;
                this.hasNotBeenSent = false;
            },err => {
                this.hasBeenSent = false;
                this.hasNotBeenSent = true;
                });
        if(this.hasBeenSent)
            form.reset();
    }

    getAllNicks():void{
        this.messageService
            .getNicksAllUser()
            .subscribe( result => this.listOfNick);

    }

    //TODO: Coorect the algorithm to improve speed: for example we can start search from nick where first character is the same like search nick
    checkIfNickExist(nickOfRecipientFromUser):void{
       this.recipientExist = false;
       this.recipientNotExist = false;
       // loop forEach in typescript for list
        var czy = this.listOfNick.find(myObj => myObj.nick == nickOfRecipientFromUser);
        if(czy != null){
            this.recipientExist = true;
        }
        else {
            this.recipientNotExist = true;
        }
    }
}

