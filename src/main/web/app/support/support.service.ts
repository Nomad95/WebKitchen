import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {TokenUtils} from "../login/token-utils";
import {Http} from "@angular/http";

@Injectable()
export class SupportService {

    private headers = null;
    private url;

    constructor(private http: Http) {
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
        let token = currentToKey && currentToKey.token;
        let username = currentToKey && currentToKey.username;


        //create appropriate
        this.headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });
    }

    sendMessageFromSupport(message): Observable<any>{
        this.url = '/api/mail/support/send';
        return this.http.post(this.url,JSON.stringify(message),{headers :this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
