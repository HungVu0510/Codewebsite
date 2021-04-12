import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../api-service/api.service';
import {map} from 'rxjs/operators';
import {merge} from 'rxjs';

import {HorizontalMenuItems} from 'app/core/menu/horizontal-menu-items/horizontal-menu-items';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
const USER_TOKEN = 'authenticateToken';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: Observable<firebase.User>;
    userData: any;
    isLoggedIn = false;
    token: String = null;

    constructor(private firebaseAuth: AngularFireAuth,
                private router: Router,
                private toastr: ToastrService,
                private apiService: ApiService,
                private translate: TranslateService,
                private http: HttpClient) {
        this.user = firebaseAuth.authState;
    }

    /*
     *  getLocalStorageUser function is used to get local user profile data.
     */
    getLocalStorageUser() {
        this.userData = JSON.parse(localStorage.getItem('userProfile'));
        if (this.userData) {
            localStorage.setItem('language', this.userData.language);
            let language: string = this.translate.getBrowserLang();
            if (localStorage.getItem('language') !== null) {
                language = localStorage.getItem('language').substring(0, 2);
            }
            this.translate.use(language.match(/en|fr/) ? language : 'en');
            this.isLoggedIn = true;
            return this.userData;
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }

    isUserLogined() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isLoggedIn = true;
            return true;
        } else {
            this.isLoggedIn = false;
            return false;
        }
    }

    /*
     * loginUser fuction used to login
     */
    loginUser(value) {
        let user;
        this.http.get(environment.apiUrl + 'users?username=' + value.account + '&password=' + value.password)
            .subscribe((response: Response) => {
                user = response[0];
                console.log(user);
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.setUsername(value.account);
                    this.setToken(user.token);
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('role', user.role);
                    localStorage.setItem('userProfile', JSON.stringify(user));
                    this.toastr.success('Successfully Logged In!');
                    this.router.navigate(['/']);
                }
                return user;
            });
    }

    /*
     * logOut function is used to sign out
     */
    logOut() {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('student');
        localStorage.removeItem('role');
        this.isLoggedIn = false;
        this.toastr.success('Successfully logged out!');
        this.router.navigate(['/session/login']);
    }

    private setToken(token: any) {
        localStorage.setItem('token', token);
    }

    private setUser(username) {
        this.apiService.synccurrentUser(username).subscribe(user => {
            localStorage.setItem('userProfile', JSON.stringify(user));
            const user1 = JSON.parse(localStorage.getItem('userProfile'));
            localStorage.setItem('userId', user1.id);
            localStorage.setItem('role', user1.role);
        });
    }

    private setUsername(account: any) {
        localStorage.setItem('username', account);
    }

    getPermissionSubMenu() {
        const menuItems = new HorizontalMenuItems();
        const adminItem = {
            name: 'NAVBAR.Admin',
            type: 'sub',
            class: 'group-title',
            icon: '',
            children: [
                {state: 'admin/subject', name: 'NAVBAR.Subject', type: 'link'},
                {state: 'admin/teacher', name: 'NAVBAR.Teacher', type: 'link'},
                {state: 'admin/student', name: 'NAVBAR.Student', type: 'link'},
            ]
        };
        if (localStorage.getItem('role') === 'ADMIN') {
            if (!menuItems.contain(adminItem)) {
                menuItems.add(adminItem);
            }
        }
        return menuItems;
    }
}
