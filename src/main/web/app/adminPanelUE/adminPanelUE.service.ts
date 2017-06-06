import {Injectable, Inject}    from '@angular/core';
import {Headers, Http, Response}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {UserAccount} from '../registration/user-account';

@Injectable()
export class AdminPanelUEService {

    private headers = null;
    private url;
    private name;

    constructor(private http: Http) {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        let username = currentToKey && currentToKey.username;


        //create appropriate
        this.headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

    }

    authorization() {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;


    }

    getUserAccountByName(data): Observable<any> {
        this.url = '/api/user/account/' + data;
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);

    }

    getUserDetailsByUserAccount(id): Observable<any> {
        this.url = '/api/user/details/' + id;
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteUserAccount(id): Observable<void> {
        this.url = '/api/user/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    deleteUserDetails(id): Observable<void> {
        this.url = '/api/user/details/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    deleteEvent(id): Observable<void> {
        this.url = '/api/event/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    createBanForUser(data, idUser): Observable<UserAccount> {
        this.url = '/api/user/banned/create/' + idUser;
        return this.http.post(this.url, JSON.stringify(data), {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    getEventDetailsByTitle(data): Observable<any> {
        this.url = '/api/event/detailed/title/' + data;
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}