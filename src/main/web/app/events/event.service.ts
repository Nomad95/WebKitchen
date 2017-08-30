import {Injectable}    from '@angular/core';
import { Http, Headers }    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable}    from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {Errors} from "../util/error/errors";
import {ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";
import {TokenUtils} from "../login/token-utils";
import {LoginService} from "../login/login.service";
import {EventRating} from "./model/eventRating";
import {CommentDTO} from "./model/commentDto";


@Injectable()
export class EventService {
    constructor(
        private http: Http,
        private toasterService: ToasterService,
        private loginService: LoginService) {
    }

    private token = '';
    private username = '';

    /**
     *
     * Returns json with general informations of events
     */
    getGeneralEvents(page, size):Observable<any[]> {
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/general/all?page='+page+'&size='+size, {headers: headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));    }

    getTotalPages(page,size): Observable<any> {
        this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/general/count?page='+page+'&size='+size, {headers: headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));
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
            .catch(err => this.handleError(err));    }

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
            .catch(err => this.handleError(err));    }

    /**
     * Finds users events and participants
     * @param id of current user
     */
    getUserEventsAndParticipants(id: number): Observable<any[]>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/userevents/'+id, {headers: headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));    }

    /**
     * Gets user address information (city, street, street nr, house nr)
     * @param userId user account id
     */
    getUserAddress(userId: number): Observable<any>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/address/'+userId, {headers: headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));    }

    /**
     * finds evnt owner username
     */
    getEventsOwnerUsername(eventId: number){
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/ownerusername/'+eventId, {headers: headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));    }

    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanCreateEvent(userId: number): Observable<boolean>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/eventcheck/cancreate/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(err => this.handleError(err));    }

    getRating(eventid, userid, ownerid): Observable<EventRating>{
        this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/rating?eventId='+eventid+'&userId='+userid+'&ownerId='+ownerid, {headers: headers})
            .map((res) => res.json())
            .catch(err => this.handleError(err));
    }

    addRating(rating: EventRating){
        this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.post('/api/rating/create', rating, {headers: headers})
            .map((res) => res.json())
            .catch(err => this.handleError(err));
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
            .catch(err => this.handleError(err));    }


    /**
     * Checks if user has filled required fields in profile to create new event
     * @returns true if is verified else false
     */
    checkIfUserCanJoinAnEvent(userId: number): Observable<boolean>{
        this.instantiateToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/user/details/eventcheck/canjoin/'+userId, {headers: headers})
            .map((res) => res.json())
            .catch(err => this.handleError(err));    }

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
            .catch(err => this.handleError(err));    }

    /**
     * Adds comment to provided rating
     */
    addCommentToRating(ratingId: number,commentDto: CommentDTO): Observable<EventRating>{
        this.instantiateToken();
        let headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.post('/api/rating/comment/'+ratingId,commentDto,{headers: headers})
            .map( res => res.json())
            .catch(err => this.handleError(err));
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
            .catch(err => this.handleError(err));    }

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
            .catch(err => this.handleError(err));    }

    /**
     * Assigns logged user to Event
     * @param id
     * //TODO: username
     */
    assignUserToEvent(id:number) {
        //this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd","Proszę spróbować jeszcze raz"));

        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);

        return this.http.get('/api/event/bind/' + this.username + '/' + id, {headers: headers})
            .map( () => null)
            .catch(err => this.handleError(err));
    }

    /**
     * checks if event has already happened
     * @param eventId
     */
    isEventHasAlreadyHappened(eventId: number): Observable<boolean> {

        this.instantiateToken();

        var headers = this.createHeadersWithContentAndToken(this.token);

        //and passing them in the request
        return this.http.get('/api/event/check/'+ eventId,{headers :headers})
            .map((res) => res.json())
            .catch(err => this.handleError(err));
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
     * reads token from local/session storage and extracts username and token value
     */
    instantiateUsernameAndToken(){
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
        this.token = currentToKey && currentToKey.token;
        this.username = currentToKey && currentToKey.username;
    }

    /**
     * reads token from local/session storage and extracts  token value
     */
    instantiateToken(){
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
        this.token = currentToKey && currentToKey.token;
    }

    private handleError(error: any):Promise<any> {
        let errorBody = JSON.parse(error._body);
        this.printErrorNotification(errorBody.path, error);

        return Promise.reject(error.message || error);
    }

    private printErrorNotification(path: string, error: any){
        if(error.status == Errors.HTTPSTATUS_UNAUTHORIZED ){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Wygląda na to że twoja sesja wygasła. Spróbuj zalogować się ponownie"));
            this.loginService.checkIfTokenIsValid();
        }
        else if (path.search("/api/user/details/events/") == 0 && error.status == Errors.HTTPSTATUS_NOT_FOUND){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
        }
        else if (path.search("/api/user/details/address/") == 0 && error.status == Errors.HTTPSTATUS_NOT_FOUND){
        }
        else if (path.search("/api/event/ownerusername/") == 0 && error.status == Errors.HTTPSTATUS_NOT_FOUND){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
        }
        else if (path.search("/api/event/userevents/refuse/") == 0 && error.status == Errors.HTTPSTATUS_NOT_FOUND){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
        }
        else if (path == "/api/upload/photo/dish" && error.status == Errors.HTTPSTATUS_NOT_FOUND){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Nie wybrałeś zdjęcia",""));
        }
        else if (path == "/api/upload/photo/dish" && error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Dodanie zdjęcia się nie powiodło",""));
        }
        else if (path == "/api/upload/photo/dish" && error.status == Errors.HTTPSTATUS_BAD_REQUEST){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Dodanie zdjęcia się nie powiodło",""));
        }
        else if (path.search("/api/event/bind/") == 0 && error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
        }
        else if (error.status == Errors.HTTPSTATUS_NOT_FOUND){
        }
        else if (error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
        }
    }
}