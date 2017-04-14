import {Injectable}    from '@angular/core';
import {Headers, Http}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';

@Injectable()
export class EventService {
    constructor(private http:Http) {
    }

    /**
     *
     * @returns {Promise<any|T>|Promise<T>|Promise<any>|any|Promise<R>}
     * Returns json with general informations of events
     */
    getGeneralEvents():Observable<any[]> {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/general/all', {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * @param id id of event
     * @returns one detailed event information
     */
    //TODO: zamiast Any zrobic typeSafe model?? i wydobyc metode z headerami
    getDetailedEvent(id:number):Observable<any> {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/' + id, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Assigns logged user to Event
     * @param id
     * @returns {Promise<R>|any|Promise<any|T>|Promise<any>|Promise<T>}
     */
    assignUserToEvent(id:number) {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        let username = currentToKey && currentToKey.username;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/bind/' + username + '/' + id, {headers: headers})
            .map(() => null)
            .catch(this.handleError);
    }

    /**
     * checks if user is arleady bound to this event
     * @param id
     * @returns true if bound, false if not
     */
    checkUser(id:number) {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;
        let username = currentToKey && currentToKey.username;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/check/' + username + '/' + id, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }


    private handleError(error:any):Promise<any> {
        console.error('An error occurred in EventService', error);
        return Promise.reject(error.message || error);
    }
}