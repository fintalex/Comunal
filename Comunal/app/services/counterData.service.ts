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

    getSumForCounter(countData: CounterData, readingOrODN: number) {

        if (!countData) return 0;

        var summ = 0;
        var currentPlusReading = readingOrODN == 1 ? countData.Reading - countData.LastReading : countData.ReadingODN;

        if (!countData.Limit1 || countData.Limit1 == 0 || currentPlusReading <= countData.Limit1) {
            return currentPlusReading * countData.Tarif1;
        }

        if (currentPlusReading > countData.Limit1) {
            summ += countData.Limit1 * countData.Tarif1;
        }

        if (!countData.Limit2 || countData.Limit2 == 0 || currentPlusReading <= countData.Limit2) {
            summ += (currentPlusReading - countData.Limit1) * countData.Tarif2;
        } else {
            summ += (countData.Limit2 - countData.Limit1) * countData.Tarif2;
            summ += (currentPlusReading - countData.Limit2) * countData.Tarif3;
        }

        return summ;
    }
    

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

}
