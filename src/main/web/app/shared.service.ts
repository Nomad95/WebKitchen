import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    private isBanned: boolean;
    private isAdmin: boolean = false;
    private hasNewMessage: boolean;
    private numberOfUnreadMessages: number;

    public getIsBanned():boolean {
        return this.isBanned;
    }

    public setIsBanned(_isBanned:boolean) {
        this.isBanned = _isBanned;
    }
    public getIsAdmin():boolean {
        return this.isAdmin;
    }

    public setIsAdmin(_isAdmin:boolean) {
        this.isAdmin = _isAdmin;
    }

    public getHasNewMessage():boolean {
        return this.hasNewMessage;
    }

    public setHasNewMessage(_hasNewMessage:boolean) {
        this.hasNewMessage = _hasNewMessage;
    }

    public getNumberOfUnreadMessages():number {
        return this.numberOfUnreadMessages;
    }

    public setNumberOfUnreadMessages(_numberOfUnreadMessages:number) {
        this.numberOfUnreadMessages = _numberOfUnreadMessages;
    }

}