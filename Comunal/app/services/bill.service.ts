import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';
import { CounterDataService } from '../services/counterData.service';

import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill';
import { CounterData } from '../models/counterData';
import { MaintenanceData } from '../models/maintenanceData';

import * as _ from 'underscore';

@Injectable()
export class BillService {
    bills: Bill[];
    private apiUrl = 'api/Bills'

    constructor(
        private http: Http,
        private authService: AuthService,
        private counterDataService: CounterDataService) {

    }

    getBill(billId: number): Observable<Bill> {
        return this.http.get(`${this.apiUrl}/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }
    
    getBills(userId: number): Observable<Bill[]> {
        return this.http.get(`${this.apiUrl}/byuser/${userId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getFlatBillsByFlatId(flatId: number): Observable<Bill[]> {
        return this.http.get(`${this.apiUrl}/byFlat/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createBill(newBill: Bill): Observable<Bill>  {
        return this.http.post(this.apiUrl, newBill)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteBill(billId: number) {
        return this.http.delete(`${this.apiUrl}/${billId}`)
            .catch(this.handleError);
    }

    updateBill(bill: Bill) {
        return this.http.put(`${this.apiUrl}`, bill)
            .catch(this.handleError);
    }

    // then here will be maintainces also
    getSummForBill(counterDatas: CounterData[], maintenanceData: MaintenanceData[]) {

        var summ = 0;
        _.forEach(counterDatas, (countData: any) => {
            summ += this.counterDataService.getSumForCounter(countData, 1);
            summ += this.counterDataService.getSumForCounter(countData, 2);
        });

        _.forEach(maintenanceData, (maintData: any) => {
            summ += maintData.Tarif * maintData.Coefficient * this.counterDataService.getReadingForWaterCounter(maintData.Maintenance.CounterTypes, counterDatas);
        });

        return summ;
    }

    

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
