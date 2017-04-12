import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Counter } from '../models/counter';

@Injectable()
export class CounterService {
    counters: Counter[];
    private apiUrl = 'api/Counters'

    constructor(private http: Http) {

    }
    
    getCounters(): Observable<Counter[]> {
        return this.http.get(this.apiUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getFlatCountersByFlatId(flatId: number): Observable<Counter[]> {
        return this.http.get(`${this.apiUrl}/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getWaterCountersByFlatId(flatId: number): Observable<Counter[]> {
        return this.http.get(`${this.apiUrl}/waters/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createCounter(newCounter: Counter): Observable<Counter>  {
        return this.http.post(this.apiUrl, newCounter)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteCounter(counterId: number) {
        return this.http.delete(`${this.apiUrl}/${counterId}`)
            .catch(this.handleError);
    }

    updateCounter(counter: Counter) {
        return this.http.put(`${this.apiUrl}`, counter)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
