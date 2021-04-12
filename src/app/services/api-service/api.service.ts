import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ApiService {

    token: String = null;

    constructor(private http: HttpClient) {
    }

    getToken() {
        return this.token;
    }

    setToken(token: String) {
        this.token = token;
    }

    removeToken() {
        this.token = null;
    }

    delete(url, body) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('X-AUTH-TOKEN', this.token + '');
        let options = {
            body: body,
            headers: headers
        };

        return this.http.delete(url, options);
    }

    login(username: String, password: String) {
        let user = null;
        this.http.get(environment.apiUrl + 'users?username=' + username + '&password=' + password)
            .subscribe((response: Response) => {
                user = response.json()[0];
                console.log(user);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
        return user;
    }

    synccurrentUser(username) {
        return this.http.get(environment.apiUrl + 'users?username=' + username, {});
    }

}
