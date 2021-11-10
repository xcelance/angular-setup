import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Login } from '../shared/login';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	authToken: any;
	options: any;
	domain = environment.domain;

	constructor(private http: HttpClient) { }

	// Load token and current logged in user.
	loadToken() {
	    this.authToken = localStorage.getItem('token');
	    // this.setUser(JSON.parse(localStorage.getItem('user')));
  	}

  	// create authorization headers.
	createAuthenticationHeaders() {
		this.loadToken();

		this.options = {
		    headers: new HttpHeaders({
		      	'Content-Type': 'application/json',
		      	'authorization': this.authToken
		    })
  		}
	}

	// Error handling 
	handleError(error:any) {
		let errorMessage = '';
		if(error.error instanceof ErrorEvent) {
			// Get client-side error
			errorMessage = error.error.message;
		} else {
			// Get server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}

		return throwError(errorMessage);
	}

	loggedIn() {
		if(localStorage.getItem('token')) {
			return true;
		} else {
			return false;
		}
	}

	getUser() {
		if(localStorage.getItem('user')) {
			return localStorage.getItem('user');
		}
		return null;
	}

	storeUserData(data:any) {
		if(data) {
			if(data.access_token) { localStorage.setItem('token', data.access_token); }
	        if(data.user) { localStorage.setItem('user', JSON.stringify(data.user)); }
	    }
	}

	login(credentials:any): Observable<Login> {
    	return this.http.post<Login>(`${this.domain}/auth/login`, credentials).pipe(retry(1),catchError(this.handleError));
	}

	logout() {
		localStorage.clear();
	}
}
