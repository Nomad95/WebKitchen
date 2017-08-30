import {Injectable}    from '@angular/core';
import {Headers, Http, Response}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {TokenUtils} from "../login/token-utils";

@Injectable()
export class MessageService {

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

    sendMessage(message,recipient_username ): Observable<any>{
        this.url = '/api/message/send/'+recipient_username;
        return this.http.post(this.url,JSON.stringify(message),{headers :this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    sendNotification(notificationMessage, recipient_username ): Observable<any>{
        this.url = '/api/notification/send/'+recipient_username;
        return this.http.post(this.url,{contentOfNotification : notificationMessage},{headers :this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    getNicksAllUser(): Observable<any>{
        this.url = '/api/user/nick/all';
        return this.http.get(this.url,{headers :this.headers})
            .map((res:Response) => res.json());
    }

    getMyReceivedMessages(): Observable<any> {
            this.url = 'api/message/myMessages/received';
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    getMySentMessages(): Observable<any> {
        this.url = '/api/message/myMessages/sent';
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())

    }
    getReceivedMessageDetails(id): Observable<any> {
        this.url = '/api/message/myMessages/received/'+id;
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    getSentMessageDetails(id): Observable<any> {
        this.url = '/api/message/myMessages/sent/'+id;
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);

    }

    deleteMyReceivedMessage(id): Observable<void> {
        this.url = '/api/message/myMessages/received/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    deleteMySentMessage(id): Observable<void> {
        this.url = '/api/message/myMessages/sent/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}