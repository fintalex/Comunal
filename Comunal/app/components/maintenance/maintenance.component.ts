﻿import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceDataService } from '../../services/maintenanceData.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';

import { Maintenance } from '../../models/maintenance';
import { MaintenanceData } from '../../models/maintenanceData';

@Component({
    moduleId: module.id,
    selector: 'maintenance-list',
    templateUrl: `maintenance.component.html`,
    animations: [
        //trigger('itemAnim', [
        //    state('in', style({ transform: 'translateX(0)' })),
        //    transition('void => *', [
        //        animate(300, keyframes([
        //            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
        //            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
        //            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        //        ]))
        //    ]),
        //    transition('* => void', [
        //        animate(300, keyframes([
        //            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        //            style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
        //            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        //        ]))
        //    ])
        //])
        trigger('itemAnim', [
            state('newElement', style({ opacity: 1, transform: 'translateX(-100%)' })),
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-100%)' }),
                animate('1s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ]),
            transition(':leave', [
                animate('1s ease', style({ transform: 'translateX(-100%)' })),
                animate('0.3s ease', style({ opacity: 0 }))
            ])
        ]),
    ]
})
export class MaintenanceComponent implements OnInit  {
    myMaintenances: Maintenance[] = [];
    currentMaintenance: Maintenance;
    maintenanceDatas: MaintenanceData[];

    constructor(
        private maintenanceService: MaintenanceService,
        private maintenanceDataService: MaintenanceDataService,
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

    // Press EDIT in UI
    editMaintenance(currentMaintenance: Maintenance, event: any) {
        event.stopPropagation();
        console.log(currentMaintenance);
        this.currentMaintenance = Object.assign({}, currentMaintenance);
        this.maintenanceService.openMaintenanceWindow(this.currentMaintenance)
            .subscribe((editedMaintenance) => {
                console.log(editedMaintenance);
                if (editedMaintenance) {
                    this.updateMaintenance(editedMaintenance);
                }
            });
    }
    // Press NEW in UI
    goToNewMaintenance() {
        event.stopPropagation();
        this.currentMaintenance = null;
        var maint = new Maintenance();
        this.maintenanceService.openMaintenanceWindow(maint)
            .subscribe((newMaintenance) => {
                if (newMaintenance) {
                    this.createNewMaintenance(newMaintenance);
                }
            });
    }

    createNewMaintenance(newMaintenance: Maintenance) {
        newMaintenance.FlatId = this.authService.CurrentUser.Flat.Id;
        this.maintenanceService.createMaintenance(newMaintenance)
            .subscribe(maintenance => {
                console.log(maintenance);
                maintenance.state = 'newElement';
                this.myMaintenances.push(maintenance);
            });
    }

    updateMaintenance(currentMaintenance: Maintenance) {
        console.log(currentMaintenance);
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

                            }
                        });
                }
            });
    }

    selectMaintenance(selectedMaintenance: Maintenance) {
        this.myMaintenances.forEach(maintenance => maintenance.Selected = false);
        selectedMaintenance.Selected = true;
        this.currentMaintenance = selectedMaintenance;

        // get history
        this.maintenanceDataService.getMaintenanceDatasByMaintenanceId(selectedMaintenance.Id)
            .subscribe(maintenanceDatas => {
                this.maintenanceDatas = maintenanceDatas;
            });
    }
}
