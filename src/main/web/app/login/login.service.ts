import {Injectable}    from '@angular/core';
import {Headers, Http}    from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable }	from 'rxjs/Observable';
import 'app/rxjs-operators';
import 'rxjs/Rx';

@Injectable()
export class LoginService{
	public token: string;
	public username:string;

	private headers = new Headers({
          'content-type' : 'application/json'});

	constructor(private http: Http) {
		var currentToKey = JSON.parse(localStorage.getItem('toKey'));
      	this.token = currentToKey && currentToKey.token;
		this.username = currentToKey && currentToKey.username;
         }

    /* getToken aka Login */
	getToken(credentials): Observable<boolean>{
		return this.http.post('/auth',JSON.stringify(credentials),{headers :this.headers})
				.map(res => {
                // login successful if there's a jwt token in the response
                let token = res.json() && res.json().token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('toKey', JSON.stringify({ username: credentials.username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            })
				.catch(this.handleError);
	}

	/* removeToken aka Logout */
	removeToken(): void{
		this.token = null;
		localStorage.removeItem('toKey');
	}


	/* checks if token exists */
	isLogged():boolean {
		var currentToKey = JSON.parse(localStorage.getItem('toKey'));
      	this.token = currentToKey && currentToKey.token;

		if (this.token != null)
			return true;
		else return false;
	}

	isUsernameLoaded():boolean {
		if (this.username != null) {
			return true;
		}
		else return false;
	}

	getUsername():string {
		var currentToKey = JSON.parse(localStorage.getItem('toKey'));
		return currentToKey.username;
	}


	//TODO: return observable
	/*private handleError(error: any): Promise<any> {
	 console.error('An error occurred!!!!!!!!!', error);
		return Promise.reject(error.message || error);
	 }*/
	private handleError(error:any):Observable<any> {
		console.error('An error occurred!', error);
		return Observable.throw(error.statusText);
	}
}