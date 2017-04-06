import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';

import { Flat } from '../models/flats';

@Injectable()
export class FlatService {
    flats: Flat[];
    private apiUrl = 'api/flats'

    constructor(
        private http: Http,
        private authService: AuthService) {

    }
    
    getFlats(userId: number): Observable<Flat[]> {
        return this.http.get(`${this.apiUrl}/byuser/${userId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createFlat(newFlat: Flat): Observable<Flat>  {
        return this.http.post(this.apiUrl, newFlat)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteFlat(flatId: number) {
        return this.http.delete(`${this.apiUrl}/${flatId}`)
            .catch(this.handleError);
    }

    updateFlat(flat: Flat) {
        return this.http.put(`${this.apiUrl}`, flat)
            .catch(this.handleError);
    }

    selectFlat(flat: Flat) {
        return this.http.put(`${this.apiUrl}/select`, flat)
            .map(() => {
                flat.Selected = true;
                this.authService.changeFlat(flat);
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
