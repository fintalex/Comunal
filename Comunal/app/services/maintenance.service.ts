import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';

import { Maintenance } from '../models/maintenance';

@Injectable()
export class MaintenanceService {
    maintenances: Maintenance[];
    private apiUrl = 'api/Maintenances'

    constructor(private http: Http) {

    }
    
    getMaintenances(): Observable<Maintenance[]> {
        return this.http.get(this.apiUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    getFlatMaintenancesByFlatId(flatId: number): Observable<Maintenance[]> {
        return this.http.get(`${this.apiUrl}/${flatId}`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    createMaintenance(newMaintenance: Maintenance): Observable<Maintenance>  {
        return this.http.post(this.apiUrl, newMaintenance)
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteMaintenance(maintenanceId: number) {
        return this.http.delete(`${this.apiUrl}/${maintenanceId}`)
            .catch(this.handleError);
    }

    updateMaintenance(maintenance: Maintenance) {
        return this.http.put(`${this.apiUrl}`, maintenance)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
