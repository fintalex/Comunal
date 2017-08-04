import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { trigger, state, style, transition, animate, query, stagger, keyframes } from '@angular/animations';

import { MaintenanceService } from '../../services/maintenance.service';
import { MaintenanceDataService } from '../../services/maintenanceData.service';
import { CounterDataService } from '../../services/counterData.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';

import { Maintenance } from '../../models/maintenance';
import { MaintenanceData } from '../../models/maintenanceData';

@Component({
    moduleId: module.id,
    selector: 'maintenance-list',
    templateUrl: `maintenance.component.html`,
    animations: [
        trigger('itemAnim', [
            //state('newElement', style({ opacity: 1, transform: 'translateX(0)' })),
            //state('hidElement', style({ opacity: 0, transform: 'translateX(-100%)' })),
            //transition('void => newElement', [
            //    style({ opacity: 0, transform: 'translateX(-100%)' }),
            //    animate('1s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            //]),
            //transition('* => void', [
            //    animate('1s ease', style({ transform: 'translateX(-100%)' })),
            //    animate('0.3s ease', style({ opacity: 0 }))
            //])

            state('newElement', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => newElement', [
                animate('1s ease-in', keyframes([
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                    style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
                ]))
            ]),
            transition('* => void', [
                animate('1s ease-in', keyframes([
                    style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                    style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                    style({ opacity: 0, transform: 'translateX(-100%)', offset: 1 }),
                ]))
            ])
            
        ]),

        //trigger('explainerAnim', [
        //    transition('* => *', [
        //        query('.col', style({ opacity: 0, transform: 'translateX(-40px) translateY(-40px)' })),

        //        query('.col', stagger('500ms', [
        //            animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
        //        ]))
        //    ])
        //]),

        trigger('staggerMaintHistory', [
            transition('* => *', [
                query('tr:enter', style({ opacity: 0 }), { optional: true }),

                query('tr:enter', stagger('100ms', [
                    animate('200ms ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateX(50px)', offset: 0 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
                    ]))
                ]), { optional: true })
            ])
        ])
    ]
})
export class MaintenanceComponent implements OnInit  {
    myMaintenances: Maintenance[] = [];
    currentMaintenance: Maintenance;
    maintenanceDatas: MaintenanceData[];

    staggerMaintHistoryIndex: number = 1;

    constructor(
        private maintenanceService: MaintenanceService,
        private maintenanceDataService: MaintenanceDataService,
        private counterDataService: CounterDataService,
        private dialogService: DialogService,
        private authService: AuthService,
        private router: Router,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.initMaintenanceList();
    }

    initMaintenanceList() {
        this.loaderService.display(true);
        this.maintenanceService.getFlatMaintenancesByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(maintenances => {
                this.loaderService.display(false);
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

    editBill(maintData: MaintenanceData) {
        this.router.navigate(['/bill', maintData.BillId, true]);
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
                maintenance.State = 'newElement';
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

        this.dialogService.addDialog(ConfirmComponent, { title: "Подтвердите удаление услуги", message: "Вы точно хотите удалить услугу?" })
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
                this.staggerMaintHistoryIndex++;
                this.maintenanceDatas = maintenanceDatas;
            });
    }
}
