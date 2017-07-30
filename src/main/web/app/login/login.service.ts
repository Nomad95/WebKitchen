import {Injectable}    from '@angular/core';
import {Headers, Http}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import {SharedService} from "../shared.service";
import {ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";
import {Errors} from "../util/error/errors";
import {TokenUtils} from "./token-utils";
import { Router } from '@angular/router';


@Injectable()
export class LoginService{
	public token: string;
	public username:string;
	//RedirectUrl - url user wanted to go before loggin in the app
	public redirectUrl:string;
	private isAdmin: boolean;
	private isBanned: boolean;
	private url;

	private headers = new Headers({
		'content-type' : 'application/json'});
	private headersLoggedUser = null;

	constructor(private http:Http,
				private sharedService:SharedService,
				private router: Router,
				private toasterService: ToasterService) {

		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		this.token = currentToKey && currentToKey.token;
		this.username = currentToKey && currentToKey.username;
	}

	/* getToken aka Login */
	getToken(credentials,shouldBeRemembered): Observable<boolean>{
		return this.http.post('/auth',JSON.stringify(credentials),{headers :this.headers})
            .map(res => {
				// login successful if there's a jwt token in the response
				let token = res.json() && res.json().token;
				if (token) {
					// set token property
					this.token = token;

					// store username and jwt token in local storage to keep user logged in between page refreshes
					//sessionStorage.setItem('toKey', JSON.stringify({ username: credentials.username, token: token }));
					TokenUtils.storeToken(shouldBeRemembered,JSON.stringify({ username: credentials.username, token: token }));

					// return true to indicate successful login
					return true;
				} else {
					// return false to indicate failed login
					return false;
				}
			})
			.catch(err => this.handleError(err));
	}

	getInfoAboutMyBan(): Observable<any> {
		return this.http.get('/api/user/banned/account/'+this.username, {headers: this.headers})
            .map(res => res.json())
			.catch(err => this.handleError(err));
	}

	getIdByUsername(): Observable<number>{
		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		let username = currentToKey && currentToKey.username;
		let token = currentToKey && currentToKey.token;

		var headers = new Headers({
			'content-type': 'application/json',
			'X-Auth-token': token
		});

		return this.http.get("api/user/account/"+username+"/getid", {headers: headers})
            .map((res) => res.json())
			.catch(err => this.handleError(err));
	}

	getUsername(): string {
		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		return currentToKey.username;
	}

	/* removeToken aka Logout */
	removeToken(): void{
		this.token = null;
		TokenUtils.removeStoredTokens();
	}

	isUsernameLoaded(): boolean {
		return this.username != null;
	}

	/* checks if token exists */
	isLogged(): boolean {
		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		this.token = currentToKey && currentToKey.token;

		return this.token != null;
	}

	checkIsUserBanned(): Observable<any>{
		return this.http.get('/api/user/checkIsBanned/'+this.getUsername(),{headers :this.headers})
            .map(res => res.json())
			.catch(err => this.handleError(err));
	}
	/**
	 * Finds user id by username
	 * @returns id of username
	 */

	checkVariableIsBanned(): Observable<any>{
		return this.http.get('/api/user/checkIsBanned/'+this.getUsername(),{headers :this.headers})
            .map(res => res.json())
			.catch(err => this.handleError(err));
	}

	checkIsUserAnAdmin(): Observable<any>{
		this.headersLoggedUser = new Headers({
			'content-type' : 'application/json',
			'X-Auth-token' : this.token
		});
		return this.http.get('/api/user/getMyRole',{headers :this.headersLoggedUser})
            .map(res => res.json())
			.catch(err => this.handleError(err));
	}

	/**
	 * Performs a check if user has clicked acceptation link
     */
	checkIfUserIsEnabled(username: string): Observable<boolean>{
		return this.http.get('api/user/registration/enable/'+username)
			.map(res => res.json())
			.catch(err => this.handleError(err));
	}

	countMyUnreadMessages(){
		this.headersLoggedUser = new Headers({
			'content-type' : 'application/json',
			'X-Auth-token' : this.token
		});
		this.url = "/api/message/myMessages/received/quantity/unread";
		return this.http.get(this.url,{headers :this.headersLoggedUser})
            .map(res => res.json())
			.catch(err => this.handleError(err));
	}

	getMyNick(): Observable<any>{
		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		let token = currentToKey && currentToKey.token;

		var headers = new Headers({
			'content-type': 'application/json',
			'X-Auth-token': token
		});

		return this.http.get("api/user/myNick", {headers: headers})
            .map((res) => res.json())
			.catch(err => this.handleError(err));
	}

	countMyUnreadNotifications(){
		this.headersLoggedUser = new Headers({
			'content-type' : 'application/json',
			'X-Auth-token' : this.token
		});
		this.url = "/api/notification/myNotifications/quantity/unread";
		return this.http.get(this.url,{headers :this.headersLoggedUser})
            .map(res => res.json())
            .catch(this.handleError);
	}


	private handleError(error: any):Promise<any> {
		let errorBody = JSON.parse(error._body);
		this.printErrorNotification(errorBody.path, error);
		console.log('error has occured in login service',error);

		return Promise.reject(error.message || error);
	}

	private printErrorNotification(path: string, error: any){
		//jak macie jakies errory do pokazania to takjak tu scieżka + response status
		//nie pokazujmy za dużo errorów na raz
		if(path != "/auth" && error.status == Errors.HTTPSTATUS_UNAUTHORIZED ){
			console.log("User is not authorized");
			this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Wygląda na to że twoja sesja wygasła. Spróbuj zalogować się ponownie"));

			//Wait couple of seconds after printing a notification, then check token expiry
			this.checkIfTokenIsValid();
		}
		else if (path == "/auth" && error.status == Errors.HTTPSTATUS_BAD_REQUEST){
			console.log("Bad request!");
			this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Logowanie się nie powiodło",""));
		}
		else if (error.status == Errors.HTTPSTATUS_NOT_FOUND){
			console.log("Data not found!");
		}
		else if (error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
			console.log("Server eror!");
		}
	}

	validateToken(token: string, username: string){
		var headers = new Headers({
			'content-type': 'application/json',
		});

		this.http.post("auth/validateToken/"+username,{tokenValue: token},{headers :this.headers})
            .map(res => res.json())
            .catch(err => this.handleError(err));
	}
	/**
	 * Checks if token has expired
	 */
	public checkIfTokenIsValid(){
		var currentToKey = JSON.parse(TokenUtils.getStoredToken());
		let username = currentToKey && currentToKey.username;
		let token = currentToKey && currentToKey.token;

		this.validateToken(token,username)
            .subscribe( data => {
				if(data == true){
					TokenUtils.removeStoredTokens();
					this.router.navigate(['/']);
				} else
					console.log("token valid");
			});
	}
}