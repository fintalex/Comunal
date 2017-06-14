import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { MaintenanceDataService } from '../../services/maintenanceData.service';
import { MaintenanceService } from '../../services/maintenance.service';

import { MaintenanceData } from '../../models/maintenanceData';
import { Maintenance } from '../../models/maintenance';

export interface EditMaintenanceDataModel {
    maintenanceData: MaintenanceData
}

@Component({
    moduleId: module.id,
    selector: 'editMaintenanceData',
    templateUrl: `editMaintenanceData.component.html`,
})
export class EditMaintenanceDataComponent extends DialogComponent<EditMaintenanceDataModel, any> implements  OnInit { 
    maintenanceData: MaintenanceData;
    currentMaintenance: Maintenance;
    showMaintenancePanel: boolean = false;
    maintenanceDataBefore: {} = {};
    
    tarifUpdated: boolean = false;
    maintenanceForUpdate: Maintenance;

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
        private maintenanceDataService: MaintenanceDataService,
        private maintenanceService: MaintenanceService) {
        super(dialogService);
    }

    ngOnInit() {
        Object.assign(this.maintenanceDataBefore, this.maintenanceData);
    }
    
    cancel() {
        this.result = this.maintenanceDataBefore;
        this.close();
    }

    apply() {
        this.result = this.maintenanceData;
        this.close();
    }
}

