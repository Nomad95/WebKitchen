import {Injectable}    from '@angular/core';
import {Headers, Http}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import { UserAccount } from './user-account';
import {ToasterService} from 'angular2-toaster';
import {ToastConfigurerFactory} from "../util/toast/toast-configurer.factory";
import {Errors} from "../util/error/errors";

@Injectable()
export class RegistrationService{
	constructor(
		private http: Http,
		private toasterService: ToasterService) { }

	private headers = new Headers({
          'accept': 'application/json',
          'content-type' : 'application/json'});

	/**
	  * This methods returns an Observable class
	  * The ajax http requests are asynchronous so
	  * we are not getting the answer immediately
	  * the generic class in Observable must be the
	  * exact type of returned value (we need to make
	  * an interface and import it)
	  */
	getOneAccount(id): Observable<UserAccount>{
		return this.http.get('/api/user/account/'+id)
				   .map(res =>  res.json())
			.catch(err => this.handleError(err));
	}


	/* Niech te metody nrazie tu beda te wszystkie */
	getUsersAccounts(): Observable<UserAccount[]>{
		return this.http.get('/api/user/all')
               .map(res =>  res.json())
			.catch(err => this.handleError(err));
	}

	deleteUserAccount(id): Observable<void>{
		return this.http.delete('/api/user/'+id, {headers : this.headers})
				.map( () => null)
			.catch(err => this.handleError(err));
	}

	createUserAccount(data): Observable<UserAccount>{
		return this.http.post('/api/user/create',JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
			.catch(err => this.handleError(err));
	}

	updateUserAccount(data): Observable<UserAccount>{
		return this.http.put('/api/user/'+data.id,JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
			.catch(err => this.handleError(err));
	}

	//three methods below checks if username nick or email is taken
	checkIfUsernameIsTaken(username): Observable<boolean>{
		return this.http.get('/api/user/registration/taken/username/'+username)
			.map(res =>  res.json())
			.catch(err => this.handleError(err));
	}

	checkIfEmailIsTaken(email): Observable<boolean>{
		return this.http.post('/api/user/registration/taken/email',{email : email})
			.map(res =>  res.json())
			.catch(err => this.handleError(err));
	}

	checkIfNickIsTaken(nick): Observable<boolean>{
		return this.http.get('/api/user/registration/taken/nick/'+nick)
			.map(res =>  res.json())
			.catch(err => this.handleError(err));
	}

	verifyCaptcha(response): Observable<any>{
		//request body -> goes to backend
		let body = {
			'response' : response
		};

		return this.http.post('captcha/verify',body)
			.map(res => res.json())
			.catch(err => this.handleError(err));
	}

	confirmRegistration(token: string): Observable<boolean>{
		return this.http.get('/api/user/registration/confirm?token='+token)
			.map(res => res.json())
			.catch(err => this.handleError(err));
	}


	private handleError(error: any):Promise<any> {
		let errorBody = JSON.parse(error._body);
		this.printErrorNotification(errorBody.path, error);
		console.log('error has occured in event service',error);

		return Promise.reject(error.message || error);
	}

	private printErrorNotification(path: string, error: any){
		if(error.status == Errors.HTTPSTATUS_UNAUTHORIZED ){
			console.log("User is not authorized");
			this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Oops!","Wygląda na to że twoja sesja wygasła. Spróbuj zalogować się ponownie"));
		}
		else if (path.search("/api/user/registration/confirm") == 0 && error.status == Errors.HTTPSTATUS_BAD_REQUEST){
			console.log("Cant Confirm registration: Bad request");//TODO: nie ma w htmlu
			this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
		}
		else if (path.search("/api/user/account") == 0 && error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
			console.log("Cant get User Account!");
			this.toasterService.pop(ToastConfigurerFactory.errorSimpleMessage("Wystąpił nieoczekiwany błąd",""));
		}
		else if (error.status == Errors.HTTPSTATUS_NOT_FOUND){
			console.log("Data not found!");
		}
		else if (error.status == Errors.HTTPSTATUS_INERNAL_SERVER_ERROR){
			console.log("Server eror!");
		}

	}
}