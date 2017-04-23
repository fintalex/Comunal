import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { CounterData } from '../models/counterData';

@Injectable()
export class CounterDataService {
    counterDatas: CounterData[];
    private apiUrl = 'api/CounterDatas'

    constructor(private http: Http) {

    }
    
    getCounterDataForNewBill(flatId: number): Observable<CounterData[]> {
        return this.http.get(`${this.apiUrl}/forNewBill/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCounterDataForByBillId(billId: number): Observable<CounterData[]> {
        return this.http.get(`${this.apiUrl}/byBillId/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }
    

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
