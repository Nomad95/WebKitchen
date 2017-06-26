import {Injectable}    from '@angular/core';
import {Headers, Http}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import { UserAccount } from './user-account';

@Injectable()
export class RegistrationService{
	constructor(private http: Http) { }

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
				   .catch(this.handleError);
	}


	/* Niech te metody nrazie tu beda te wszystkie */
	getUsersAccounts(): Observable<UserAccount[]>{
		return this.http.get('/api/user/all')
               .map(res =>  res.json())
			   .catch(this.handleError);
	}

	deleteUserAccount(id): Observable<void>{
		return this.http.delete('/api/user/'+id, {headers : this.headers})
				.map( () => null)
				.catch(this.handleError);
	}

	createUserAccount(data): Observable<UserAccount>{
		return this.http.post('/api/user/create',JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	updateUserAccount(data): Observable<UserAccount>{
		return this.http.put('/api/user/'+data.id,JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	//three methods below checks if username nick or email is taken
	checkIfUsernameIsTaken(username): Observable<boolean>{
		return this.http.get('/api/user/registration/taken/username/'+username)
			.map(res =>  res.json())
			.catch(this.handleError);
	}

	checkIfEmailIsTaken(email): Observable<boolean>{
		return this.http.post('/api/user/registration/taken/email',{email : email})
			.map(res =>  res.json())
			.catch(this.handleError);
	}

	checkIfNickIsTaken(nick): Observable<boolean>{
		return this.http.get('/api/user/registration/taken/nick/'+nick)
			.map(res =>  res.json())
			.catch(this.handleError);
	}

	verifyCaptcha(response): Observable<any>{
		//request body -> goes to backend
		let body = {
			'response' : response
		};

		return this.http.post('captcha/verify',body)
			.map(res => res.json())
			.catch(this.handleError);
	}

	confirmRegistration(token: string): Observable<boolean>{
		return this.http.get('/api/user/registration/confirm?token='+token)
			.map(res => res.json())
			.catch(this.handleError);
	}


	private handleError(error: any): Promise<any> {
		console.error('An error occurred in Registration', error);
		return Promise.reject(error.message || error);
	 }
}