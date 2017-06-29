import {Injectable}    from '@angular/core';
import { Http, Headers }    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';

@Injectable()
export class EventService {
    constructor(
        private http: Http) {
    }

    private token = '';
    private username = '';

    /**
     *
     * Returns json with general informations of events
     */
    getGeneralEvents():Observable<any[]> {
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/general/all', {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * @param id id of event
     * @returns one detailed event information
     */
    getDetailedEvent(id:number):Observable<any> {
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/' + id, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * gets all events which user participates in
     * @param userId users id
     * @returns some events information
     */
    getUserEventsWhichHeParticipates(userId: number): Observable<any>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/events/'+userId,{headers: headers})
            .map( res => res.json())
            .catch(this.handleError);
    }

    /**
     * Finds users events and participants
     * @param id of current user
     */
    getUserEventsAndParticipants(id: number): Observable<any[]>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/userevents/'+id, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Gets user address information (city, street, street nr, house nr)
     * @param userId user account id
     */
    getUserAddress(userId: number): Observable<any>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/address/'+userId, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * finds evnt owner username
     */
    getEventsOwnerUsername(eventId: number){
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/ownerusername/'+eventId, {headers: headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanCreateEvent(userId: number): Observable<boolean>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/eventcheck/cancreate/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }

    /**
     * checks if user is arleady bound to this event
     * @param id
     * @returns true if bound, false if not
     */
    checkUser(id:number) {
        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/check/' + this.username + '/' + id, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }


    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanJoinAnEvent(userId: number): Observable<boolean>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/eventcheck/canjoin/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }

    /**
     * Adds id to event accepted list
     * @param eventId event id
     * @param userId user account id
     * @returns True if id was added
     */
    addUserIdToAcceptedList(eventId: number, userId: number){
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.post('/api/event/userevents/'+eventId+'/accept/'+userId,null,{headers: headers})
            .map( res => res.json())
            .catch(this.handleError);
    }

    /**
     * Creates new Event
     * @param data - new event from create form
     */
    createEvent(data):Observable<any> {
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.post('/api/event/create', JSON.stringify(data), {headers: headers})
            .map((res) => res.json())
            .catch(this.handleError);
    }

    /**
     * Uploads a dish photo -> store in assets
     * URI is stored in database
     * @param file - photo binaries
     */
    uploadPhoto(file:File): Observable<any> {
        this.instantiateToken();
        
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
            xhr.setRequestHeader('X-Auth-token', this.token);
            xhr.setRequestHeader('enctype', 'multipart/form-data');
            xhr.send(formData);
            //this.map(res => res.json());
        });
    }

    /**
     * Removes user from event
     * @param eventId user id
     * @param userId user id
     * @returns Updated event
     */
    rejectUserParticipation(eventId: number, userId: number): Observable<any>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.put('/api/event/userevents/refuse/'+eventId+'/'+userId,null,{headers: headers})
            .map( res => res.json())
            .catch(this.handleError);
    }

    /**
     * Assigns logged user to Event
     * @param id
     * @returns {Promise<R>|any|Promise<any|T>|Promise<any>|Promise<T>}
     * //TODO: username
     */
    assignUserToEvent(id:number) {
        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/bind/' + this.username + '/' + id, {headers: headers})
            .map(() => null)
            .catch(this.handleError);
    }


    /**
     * Creates headers object with content-type appJson and token
     * @param token
     * @returns {Headers}
     */
    public createHeadersWithContentAndToken(token:any): Headers {
        return new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });
    }

    /**
     * reads token from local storage and extracts username and token value
     */
    instantiateUsernameAndToken(){
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        this.token = currentToKey && currentToKey.token;
        this.username = currentToKey && currentToKey.username;
    }

    /**
     * reads token from local storage and extracts  token value
     */
    instantiateToken(){
        var currentToKey = JSON.parse(localStorage.getItem('toKey'));
        this.token = currentToKey && currentToKey.token;
    }

    private handleError(error:any):Promise<any> {
        console.error('An error occurred in EventService', error);
        return Promise.reject(error.message || error);
    }
}