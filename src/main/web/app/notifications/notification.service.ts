import {Injectable} from "@angular/core";
import {Headers, Http, Response}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';

@Injectable()
export class NotificationService {

    private headers = null;
    private url;

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

    getMyNotifications(numberOfPage:number): Observable<any> {
        this.url = 'http://localhost:8080/api/notification/myNotifications?page='+numberOfPage+'&size=10';
        return this.http.get(this.url, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteNotification(id): Observable<void> {
        this.url = '/api/notification/myNotifications/' + id;
        return this.http.delete(this.url, {headers: this.headers})
            .map(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}