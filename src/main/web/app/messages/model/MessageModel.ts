export class MessageModel{
    title: string;
    dateOfSend: any;
    messageContents: string;

    constructor(title, sendDate, messageContents){
        this.title = title;
        this.dateOfSend = sendDate;
        this.messageContents = messageContents;
    }

    setMessage(message: string){
        this.messageContents = message;
    }

}