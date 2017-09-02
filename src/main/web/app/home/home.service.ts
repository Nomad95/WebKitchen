import {Injectable} from "@angular/core";
import {Headers, Http}    from '@angular/http';
import {TokenUtils} from "../login/token-utils";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HomeService {

    private token = '';
    private username = '';
    private url;

    constructor(private http: Http) {
    }

    searchTop10EventsOrderedByDate(): Observable<any> {
        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);
        this.url = '/api/event/top10';
        return this.http.get(this.url, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }


    /**
     * reads token from local/session storage and extracts username and token value
     */
    instantiateUsernameAndToken() {
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
        this.token = currentToKey && currentToKey.token;
        this.username = currentToKey && currentToKey.username;
    }

    public createHeadersWithContentAndToken(token: any): Headers {
        return new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });
    }


    public handleError(error: any): Promise<any> {
        console.error('An error occurred on homme', error);
        return Promise.reject(error.message || error);
    }
}