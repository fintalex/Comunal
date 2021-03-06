﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { CounterData } from '../models/counterData';

import * as _ from 'underscore';

@Injectable()
export class CounterDataService {
    counterDatas: CounterData[];
    private apiUrl = 'api/CounterDatas'

    constructor(private http: Http) {

    }

    getCounterData(id: number): Observable<CounterData> {
        return this.http.get(`${this.apiUrl}/${id}`)
            .map(response => response.json())
            .catch(this.handleError);
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

    getCounterDatasByCounterId(counterId: number): Observable<CounterData[]> {
        return this.http.get(`${this.apiUrl}/byCounterId/${counterId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getCounterDatasNotAddedToBill(flatId: number, billId: number): Observable<CounterData[]> {
        return this.http.get(`${this.apiUrl}/notAddedToBill/${flatId}/${billId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getSumForCounter(countData: CounterData, readingOrODN: number) {

        if (!countData) return 0;

        var summ = 0;
        var lastReading = countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : (countData.LastReading ? countData.LastReading : countData.StartReading);
        if (lastReading != 0 && !lastReading) {
            return 0;
        }
        var currentPlusReading = readingOrODN == 1 ? countData.Reading - lastReading : countData.ReadingODN;

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

    getIncReading(countData: CounterData) {
        return countData.Reading ? (countData.Reading - (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : countData.StartReading)) : 0;
    }

    showReadingForCounterData(countData: CounterData) {
        var curReading = countData.Reading ? (countData.Reading).toFixed(2) : (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : 0).toFixed(2);
        var incReading = this.getIncReading(countData);
        var res = curReading + ' (' + ((incReading < 0) ? incReading.toFixed(2) : ('+' + incReading.toFixed(2))) + ')';
        return res;

        //{{countData.Reading ? (countData.Reading).toFixed(2) : (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : 0).toFixed(2)}} 
        //(+{{countData.Reading ? (countData.Reading - (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : countData.StartReading)).toFixed(2) : 0}})
    }

    getReadingForWaterCounter(counterTypes: number[], currentCounterData: CounterData[]) {
        var summ = 0;

        if (!counterTypes || counterTypes.length == 0) {
            return 1;
        }
        if (!currentCounterData || currentCounterData.length == 0) {
            return 0;
        }

        _.forEach(currentCounterData, (countData: CounterData) => {
            if (counterTypes.indexOf(+countData.CounterTypeId) > -1) {
                summ += countData.Reading ? (countData.Reading - (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : countData.StartReading)) : 0;
            }
        });
        return summ;
    }

    changeTarif(countData: CounterData) {
        return this.http.post(`${this.apiUrl}/changeTarif`, countData)
            .map(response => response.json())
            .catch(this.handleError);
    }


    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }

}
