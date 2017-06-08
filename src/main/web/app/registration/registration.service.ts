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
		return this.http.get('http://localhost:8080/api/user/account/'+id)
				   .map(res =>  res.json())
				   .catch(this.handleError);
	}


	/* Niech te metody nrazie tu beda te wszystkie */
	getUsersAccounts(): Observable<UserAccount[]>{
		return this.http.get('http://localhost:8080/api/user/all')
               .map(res =>  res.json())
			   .catch(this.handleError);
	}

	deleteUserAccount(id): Observable<void>{
		return this.http.delete('http://localhost:8080/api/user/'+id, {headers : this.headers})
				.map( () => null)
				.catch(this.handleError);
	}

	createUserAccount(data): Observable<UserAccount>{
		return this.http.post('/api/user/create',JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	updateUserAccount(data): Observable<UserAccount>{
		return this.http.put('http://localhost:8080/api/user/'+data.id,JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred in Registration', error);
		return Promise.reject(error.message || error);
	 }
}