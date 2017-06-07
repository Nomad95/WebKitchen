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

    /**
     * Creates new Event
     * @param data - new event from create form
     */
    createEvent(data):Observable<any> {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.post('/api/event/create', JSON.stringify(data), {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }

    /**
     * Uploads a dish photo -> store in assets
     * URI is stored in database
     * @param file - photo binaries
     */
    uploadPhoto(file:File):Observable<any> {
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        //create new observable; we use xhr instead of http
        return Observable.create(observer => {
            let formData:FormData = new FormData();
            let xhr:XMLHttpRequest = new XMLHttpRequest();

            //add file nad filename to FormData objct
            //first parameter should match request parameter name in rest controller!!!
            formData.append("uploadfile", file, file.name);

            //we open xhr, set headers (important. we must set headers after
            //.open), and send FormData
            xhr.open('POST', '/api/upload/photo/dish', true);
            xhr.setRequestHeader('X-Auth-token', token);
            xhr.setRequestHeader('enctype', 'multipart/form-data');
            xhr.send(formData);
        });
    }

    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanJoinAnEvent(userId: number): Observable<boolean>{
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/user/details/eventcheck/canjoin/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);

    }

    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanCreateEvent(userId: number): Observable<boolean>{
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/user/details/eventcheck/cancreate/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);

    }

    /**
     * Finds users events and participants
     * @param id of current user
     */
    getUserEventsAndParticipants(id: number): Observable<any[]>{
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/userevents/'+id, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Adds id to event accepted list
     * @param eventId event id
     * @param userId user account id
     * @returns True if id was added
     */
    addUserIdToAcceptedList(eventId: number, userId: number){//TODO: zmien na POST
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/event/userevents/'+eventId+'/accept/'+userId,{headers: headers})
            .map( res => res.json())
            .catch(this.handleError);
    }

    /**
     * gets all events which user participates in
     * @param userId users id
     * @returns some events information
     */
    getUserEventsWhichHeParticipates(userId: number){
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        let token = currentToKey && currentToKey.token;

        var headers = new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });

        return this.http.get('/api/user/details/events/'+userId,{headers: headers})
            .map( res => res.json())
            .catch(this.handleError);
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred in EventService', error);
        return Promise.reject(error.message || error);
    }
}