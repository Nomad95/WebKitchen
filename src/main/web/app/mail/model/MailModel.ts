export class MailModel{
    email: string;
    title: string;
    content: string;

    constructor(email: string, title: string, content: string) {
        this.email = email;
        this.title = title;
        this.content = content;
    }
}