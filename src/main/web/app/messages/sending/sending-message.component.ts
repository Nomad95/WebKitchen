import {MessageService} from "./message.service";
import {Component, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {find} from "../../../../../build/generated-web-resources/static/js/lib/rxjs/operator/find";

interface Nicks {
    nick: string;
}

@Component({
    selector: 'sending-message',
    providers: [MessageService],
    template:`        
    <div class="new-message">    
      <form #messageForm="ngForm">
        <div class="form-group">
            <label for="nick">Do: </label>
            <input #nick="ngModel" 
                   type="text"
                   class="form-control" 
                   name="messageToSend.recipient.nick"
                   id="nick" 
                   placeholder="Nick odbiorcy"
                   (blur)="checkIfNickExist(recipient_nick);"
                   [(ngModel)] ="recipient_nick"
            >
        </div>
          <div *ngIf="recipientNotExist" class="alert alert-danger" role="alert">
              Niepoprawny nick odbiorcy
          </div>
          <div *ngIf="recipientExist" class="alert alert-success" role="alert">
              Znaleziono odbiorce
          </div>
        <div class="form-group">
            <label for="title">Temat: </label>
            <input #title="ngModel"
                   type="text"
                   class="form-control"
                   name="messageToSend.title"
                   id="title" 
                   placeholder="Temat wiadomości"
                   [(ngModel)] = "messageToSend.title"
            >
        </div>
        <div class="form-group">
            <label for="comment">Treść: </label>
            <textarea
                    #contents="ngModel"
                    class="form-control"
                    rows="5" 
                    name="messageToSend.messageContents"
                    id="message-contents"
                    placeholder="Treść wiadomości"
                    [(ngModel)] = "messageToSend.messageContents"
            ></textarea>
        </div>
        <button type="submit" class="btn btn-default"
                (click)="sendMessageToUser(messageToSend,messageForm);">
            Wyślij
        </button>
        <br/>  
        <br>
        <div *ngIf="hasNotBeenSent" class="alert alert-danger" role="alert">
            Nie wysłano wiadomości
        </div>
        <div *ngIf="hasBeenSent" class="alert alert-success" role="alert">
            Wiadomość wysłana
        </div>
        <br>
      </form>
    </div>
    `
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

    private listOfNick: Array<Nicks>;

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

