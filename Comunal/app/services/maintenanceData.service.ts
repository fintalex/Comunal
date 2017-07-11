import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { MaintenanceData } from '../models/maintenanceData';

@Injectable()
export class MaintenanceDataService {
    maintenanceDatas: MaintenanceData[];
    private apiUrl = 'api/MaintenanceDatas'

    constructor(private http: Http) {

    }
    
    getMaintenanceDatasForNewBill(flatId: number): Observable<MaintenanceData[]> {
        return this.http.get(`${this.apiUrl}/forNewBill/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getMaintenanceDatasByBillId(billId: number): Observable<MaintenanceData[]> {
        return this.http.get(`${this.apiUrl}/byBillId/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getMaintenanceDatasNotAddedToBill(flatId: number, billId: number): Observable<MaintenanceData[]> {
        return this.http.get(`${this.apiUrl}/notAddedToBill/${flatId}/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getMaintenanceDatasByMaintenanceId(maintenanceId: number): Observable<MaintenanceData[]> {
        return this.http.get(`${this.apiUrl}/byMaintenanceId/${maintenanceId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
