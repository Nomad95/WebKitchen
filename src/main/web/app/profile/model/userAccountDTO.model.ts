export class UserAccountDTO{
    username: string;
    email: string;
    country: string;
    nick: string;
    lastLogged: string;
    isFilled: boolean;
    isVerified: boolean;
    createdAt: string;
    id: number;

    constructor() {
        this.username = '';
        this.email = '';
        this.country = '';
        this.nick = '';
        this.lastLogged = '';
        this.isFilled = false;
        this.isVerified = false;
        this.createdAt = '';
        this.id = -1; 

    }
}

