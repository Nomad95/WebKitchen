import { Injectable } from '@angular/core';
import {SearchModel} from "./search/search-model";

@Injectable()
export class SharedService {
    private isBanned: boolean;
    private isAdmin: boolean = false;
    private hasNewMessage: boolean;
    private numberOfUnreadMessages: number;
    private numberOfUnreadNotifications: number;
    private myNick;
    public criteria ={
        title: '',
        address:'',
        date: '',
        typeEvent: ''
    };


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

    public getNumberOfUnreadNotifications():number {
        return this.numberOfUnreadNotifications;
    }

    public setNumberOfUnreadNotifications(_numberOfUnreadNotifications:number) {
        this.numberOfUnreadNotifications = _numberOfUnreadNotifications;
    }

    public getMyNick():string {
        return this.myNick
    }

    public setMyNick(_myNick:string) {
        this.myNick = _myNick;
    }

    public mapToSharedService(data:SearchModel){
        this.criteria.title = data.title
        this.criteria.address = data.address;
        this.criteria.date = data.date;
        this.criteria.typeEvent = data.typeEvent;
    }

    public mapToAnotherComponent(data:SearchModel){
        data.title = this.criteria.title;
        data.address = this.criteria.address;
        data.date = this.criteria.date;
        data.typeEvent = this.criteria.typeEvent;
    }
}