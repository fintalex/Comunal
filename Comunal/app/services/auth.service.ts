﻿import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { Flat } from '../models/flats';

@Injectable()
export class AuthService{

    CurrentUser: User;
    
    constructor(private http: Http) {
        var userInStorage = localStorage.getItem('currentUser');
        if (userInStorage) {
            this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
        }
    }

    changeFlat(selectedFlat: Flat) {
        var userInStorage = localStorage.getItem('currentUser');
        if (userInStorage) {
            this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.CurrentUser.Flat = selectedFlat;
            localStorage.setItem('currentUser', JSON.stringify(this.CurrentUser));
        }
    }

    login(email: string, password: string): Observable<User> {
        return this.http.post('api/Authentication', { email: email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.CurrentUser = user;
                }
                return user;
            })
            .catch(this.handleError);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.CurrentUser = null;
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
    
}
