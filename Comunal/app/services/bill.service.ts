import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { Bill } from '../models/bill';

@Injectable()
export class BillService {
    bills: Bill[];
    private apiUrl = 'api/Bills'

    constructor(
        private http: Http,
        private authService: AuthService) {

    }
    
    getBills(userId: number): Observable<Bill[]> {
        return this.http.get(`${this.apiUrl}/byuser/${userId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getFlatBillsByFlatId(flatId: number): Observable<Bill[]> {
        return this.http.get(`${this.apiUrl}/${flatId}`)
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

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
