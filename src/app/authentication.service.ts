import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private http: HttpClient) { }

	login(email: string, password: string) {
		return this.http.post<any>(`http://tristan.changsdrapery.com/api/authenticate.php`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
					localStorage.setItem('currentUser', JSON.stringify(user));
					localStorage.setItem('userId', user.id);
                }
                return user;
            }));
	}

	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('userId');
	}
}
