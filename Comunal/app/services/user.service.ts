import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

@Injectable()
export class UserService {
    users: User[];
    private apiUrl = 'api/Users/'

    constructor(private http: Http) {

    }
    
    getUsers(): Observable<User[]> {
        return this.http.get(this.apiUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createUser(newUser: User): Observable<User>  {
        return this.http.post(this.apiUrl, newUser)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteUser(userId: number) {
        return this.http.delete(`${this.apiUrl}/${userId}`)
            .catch(this.handleError);
    }

    updateUser(user: User) {
        return this.http.put(`${this.apiUrl}`, user)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
