import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Flat } from '../models/flats';

@Injectable()
export class FlatService {
    flats: Flat[];
    private apiUrl = 'api/Flat/'

    constructor(private http: Http) {

    }
    
    getFlats(): Observable<Flat[]> {
        return this.http.get(this.apiUrl + 'GetFlats')
            .map(response => response.json())
            .catch(this.handleError);
    }

    createFlat(newFlat: Flat): Observable<Flat>  {
        console.log("Creating new flat");
        return this.http.post(this.apiUrl + 'AddFlat/', newFlat)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteFlat(flatId: number) {
        return this.http.delete(`${this.apiUrl}DeleteFlat/${flatId}`)
            .catch(this.handleError);
    }

    updateFlat(flat: Flat) {
        return this.http.post(`${this.apiUrl}UpdateFlat`, flat)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
