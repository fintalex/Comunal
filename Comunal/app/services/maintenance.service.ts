import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { EditMaintenanceDataComponent } from '../helpers/editMaintenanceData/editMaintenanceData.component';

import { DialogService } from 'ng2-bootstrap-modal';

import { Observable } from 'rxjs/Observable';

import { Maintenance } from '../models/maintenance';
import { MaintenanceTarif } from '../models/maintenanceTarif';

@Injectable()
export class MaintenanceService {
    maintenances: Maintenance[];
    private apiUrl = 'api/Maintenances'

    constructor(private http: Http,
        private dialogService: DialogService
    ) {

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

    updateMaintenance(maintenance: Maintenance): Observable<Maintenance> {
        return this.http.put(`${this.apiUrl}`, maintenance)
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateMaintenanceDataTarif(maintenanceTarif: MaintenanceTarif) {
        return this.http.post(`${this.apiUrl}/updateTarif`, maintenanceTarif)
            .catch(this.handleError);
    }

    openMaintenanceWindow(maintenance: Maintenance): Observable<Maintenance> {
        var dataForModalWindow = {
            maintenance: {}
        };

        Object.assign(dataForModalWindow.maintenance, maintenance);

        return this.dialogService.addDialog(EditMaintenanceDataComponent, dataForModalWindow);
    }


    private handleError(error: any) {
        console.error('Произошла ошибка', error);
        return Observable.throw(error.message || error);
    }
}
