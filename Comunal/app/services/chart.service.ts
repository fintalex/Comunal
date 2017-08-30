import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';

@Injectable()
export class ChartService {
    private apiUrl = 'api/charts'

    constructor(
        private http: Http,
        private authService: AuthService) {

    }
    
    getDataForDiagramExpense(request: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, request)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
