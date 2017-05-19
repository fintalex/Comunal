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

    getCounterDatasForNewBill(flatId: number, invoiceDateYear: number, invoiceDateMonth: number): Observable<CounterData[]> {
        var forNewBill = {
            FlatId: flatId,
            InvoiceDateYear: invoiceDateYear,
            InvoiceDateMonth: invoiceDateMonth,
            InvoiceDateDay: 1
        }
        return this.http.post(`${this.apiUrl}/forNewBill`, forNewBill)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCounterDatasByBillId(billId: number): Observable<CounterData[]> {
        return this.http.get(`${this.apiUrl}/byBillId/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }
    

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
