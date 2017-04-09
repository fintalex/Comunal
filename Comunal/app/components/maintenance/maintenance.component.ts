import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { MaintenanceService } from '../../services/maintenance.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';

import { Maintenance } from '../../models/maintenance';

@Component({
    moduleId: module.id,
    selector: 'maintenance-list',
    templateUrl: `maintenance.component.html`,
})
export class MaintenanceComponent implements OnInit  {
    myMaintenances: Maintenance[] = [];
    showMaintenancePanel: boolean = false;
    currentMaintenance: Maintenance;

    constructor(
        private maintenanceService: MaintenanceService,
        private dialogService: DialogService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initMaintenanceList();
    }

    initMaintenanceList() {
        this.maintenanceService.getFlatMaintenancesByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(maintenances => {
                this.myMaintenances = maintenances;
            });
    }

    goToNewMaintenance() {
        this.currentMaintenance = null;
        this.showMaintenancePanel = true;
    }

    createNewMaintenance(newMaintenance: Maintenance) {
        newMaintenance.FlatId = this.authService.CurrentUser.Flat.Id;
        this.maintenanceService.createMaintenance(newMaintenance)
            .subscribe(maintenance => {
                console.log(maintenance);
                this.myMaintenances.push(maintenance);
                this.showMaintenancePanel = false;
            });
    }

    editMaintenance(currentMaintenance: Maintenance, event: any) {
        event.stopPropagation();
        console.log(currentMaintenance);
        this.currentMaintenance = Object.assign({}, currentMaintenance);
        this.showMaintenancePanel = true;
    }

    updateMaintenance(currentMaintenance: Maintenance) {
        console.log(currentMaintenance);
        this.showMaintenancePanel = false;
        this.maintenanceService.updateMaintenance(currentMaintenance)
            .subscribe(res => {
                this.initMaintenanceList();
            });
    }

    deleteMaintenance(currentMaintenance: Maintenance, event: any) {
        event.stopPropagation();

        this.dialogService.addDialog(ConfirmComponent, { title: "Подтвердите удаление счетчика", message: "Вы точно хотите удалить счетчик?" })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.maintenanceService.deleteMaintenance(currentMaintenance.Id)
                        .subscribe(res => {
                            let indexMaintenance = this.myMaintenances.indexOf(currentMaintenance);
                            if (indexMaintenance > -1) {
                                this.myMaintenances.splice(indexMaintenance, 1);
                            }

                            if (currentMaintenance.Id == this.currentMaintenance.Id) {
                                this.showMaintenancePanel = false;
                            }
                        });
                }
            });
    }

    selectMaintenance(selectedMaintenance: Maintenance) {
        this.myMaintenances.forEach(maintenance => maintenance.Selected = false);
        selectedMaintenance.Selected = true;
    }
}
