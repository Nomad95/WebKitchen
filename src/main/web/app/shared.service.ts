import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    private isBanned: boolean;
    private isAdmin: boolean = false;

    getIsBanned():boolean {
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

    testService() {
        console.log('share!');
    }
}