import { Injectable, Inject}	from '@angular/core';
import { Headers, Http,Response }	from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';
import { UserAccount } from './user-account';

@Injectable()
export class RegistrationService{


	private headers = new Headers({
          'accept': 'application/json',
          'content-type' : 'application/json'});
	private url;

	constructor(private http: Http) { }

	/**
	  * This methods returns an Observable class
	  * The ajax http requests are asynchronous so
	  * we are not getting the answer immediately
	  * the generic class in Observable must be the
	  * exact type of returned value (we need to make
	  * an interface and import it)
	  */
	getOneAccount(id): Observable<UserAccount>{
		this.url = 'http://localhost:8080/api/user/account/'+id;
		return this.http.get(this.url)
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
		this.url = 'http://localhost:8080/api/user/'+id;
		return this.http.delete(this.url, {headers : this.headers})
				.map( () => null)
				.catch(this.handleError);
	}

	createUserAccount(data): Observable<UserAccount>{
		this.url = '/api/user/create';
		return this.http.post(this.url,JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	updateUserAccount(data): Observable<UserAccount>{
		this.url = 'http://localhost:8080/api/user/'+data.id;
		return this.http.put(this.url,JSON.stringify(data),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred in Registration', error);
		return Promise.reject(error.message || error);
	 }
}