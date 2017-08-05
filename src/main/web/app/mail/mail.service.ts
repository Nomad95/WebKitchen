import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {Observable}    from 'rxjs/Observable';
import {TokenUtils} from "../login/token-utils";
import {LoginService} from "../login/login.service";
import {Errors} from "../util/error/errors";
import {ToasterService} from "angular2-toaster";
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";

@Injectable()
export class MailService {

    constructor(
        private http: Http,
        private loginService: LoginService,
        private toasterService: ToasterService){};

    sendMail(mailModel): Observable<boolean>{
        let token = this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(token);
        return this.http.post('/api/mail/send',JSON.stringify(mailModel),{headers:headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));
    }

    sendMessageFromSupport(mailModel): Observable<boolean>{
        let token = this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(token);
        return this.http.post('/api/mail/support/send',JSON.stringify(mailModel),{headers:headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    instantiateToken(): string{
        let currentToKey = JSON.parse(TokenUtils.getStoredToken());
        return currentToKey && currentToKey.token;
    }

    createHeadersWithContentAndToken(token:any): Headers {
        return new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });
    }

    private handleError(error: any):Promise<any> {
        let errorBody = JSON.parse(error._body);
        this.printErrorNotification(errorBody.path, error);
        console.log('error has occured in event service',error);

        return Promise.reject(error.message || error);
    }

    private printErrorNotification(path: string, error: any){
        if(error.status == Errors.HTTPSTATUS_UNAUTHORIZED ){
            console.log("User is not authorized");
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Wygląda na to że twoja sesja wygasła. Spróbuj zalogować się ponownie"));
            this.loginService.checkIfTokenIsValid();
        }
        else if (path.search("/api/mail/send") == 0){
            console.log("Cant find the user!");
        }
    }
}
