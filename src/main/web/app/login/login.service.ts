import { Injectable, Inject}	from '@angular/core';
import { Headers, Http,Response }	from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';

@Injectable()
export class LoginService{
	  
	private headers = new Headers({
          'content-type' : 'application/json'});
	
	constructor(private http: Http) { }

	getToken(credentials): Observable<String>{
		return this.http.post('/auth',JSON.stringify(credentials),{headers :this.headers})
				.map(res => res.json())
				.catch(this.handleError);
	}
	
	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); 
		return Promise.reject(error.message || error);
	 }
}