import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {TokenUtils} from "../login/token-utils";
import {Observable} from "rxjs/Observable";
import {Errors} from "../util/error/errors";
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";
import {ToasterService} from "angular2-toaster";
import {LoginService} from "../login/login.service";


@Injectable()
export class SearchService{

    private token = '';
    private username = '';
    private url;

    constructor(private http: Http,
                private toasterService: ToasterService,
                private loginService: LoginService) {
    }

    searchOnlyByTitle(searchModel, numberOfPage:number, amountElements:number):Observable<any>{
        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);
        this.url = '/api/search/main?page='+numberOfPage+'&size='+amountElements;

        return this.http.post(this.url, JSON.stringify(searchModel), {headers :headers})
            .map(res => res.json())
            .catch(this.handleError);
    }

    searchEventByCriteria(criteria, numberOfPage:number, amountElements:number):Observable<any>{
        this.instantiateUsernameAndToken();
        var headers = this.createHeadersWithContentAndToken(this.token);
        this.url = '/api/search/advanced?page='+numberOfPage+'&size='+amountElements;

        return this.http.post(this.url, JSON.stringify(criteria), {headers :headers})
            .map(res => res.json())
            .catch(this.handleError);
    }


    /**
     * reads token from local/session storage and extracts username and token value
     */
    instantiateUsernameAndToken(){
        var currentToKey = JSON.parse(TokenUtils.getStoredToken());
        this.token = currentToKey && currentToKey.token;
        this.username = currentToKey && currentToKey.username;
    }

    public createHeadersWithContentAndToken(token:any): Headers {
        return new Headers({
            'content-type': 'application/json',
            'X-Auth-token': token
        });
    }


    public handleError(error: any):Promise<any> {
        let errorBody = JSON.parse(error._body);
        this.printErrorNotification(errorBody.path, error);
        console.log('error has occured in event service',error);

        return Promise.reject(error.message || error);
    }

    public printErrorNotification(path: string, error: any){
        if(error.status == Errors.HTTPSTATUS_UNAUTHORIZED ){
            console.log("User is not authorized");
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Wygląda na to że twoja sesja wygasła. Spróbuj zalogować się ponownie"));
            this.loginService.checkIfTokenIsValid();
        }
        else if (path.search("/api/search/main") == 0 && error.status == Errors.HTTPSTATUS_NOT_FOUND){
            console.log("Cant find the event!");
            this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
        }
        else if (error.status == Errors.HTTPSTATUS_NOT_FOUND){
            console.log("Data not found!");
        }
        else if (error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
            console.log("Server error!");
        }
    }



}