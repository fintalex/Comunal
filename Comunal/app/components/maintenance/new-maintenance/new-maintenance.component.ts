import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MaintenanceService } from '../../../services/maintenance.service';
import { CounterService } from '../../../services/counter.service';
import { AuthService } from '../../../services/auth.service';

import { Maintenance } from '../../../models/maintenance';
import { Counter } from '../../../models/counter';

@Component({
    moduleId: module.id,
    selector: 'new-maintenance',
    templateUrl: `new-maintenance.component.html`,
})
export class NewMaintenanceComponent implements OnInit  {
    @Output() create: EventEmitter<Maintenance> = new EventEmitter();
    @Output() update: EventEmitter<Maintenance> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() maintenance: Maintenance;

    maintenanceType: any;
    userName: any;
    myWaterCounters: Counter[] = [];

    constructor(
        private maintenanceService: MaintenanceService,
        private counterService: CounterService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        if (!this.maintenance) {
            this.maintenance = new Maintenance();
        }

        this.counterService.getWaterCountersByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(waterCounters => {
                this.myWaterCounters = waterCounters;
            });
    }

    saveMaintenance() {
    //GetWaterCountersByFlatId
        if (this.maintenance.Id) {
            this.update.emit(this.maintenance);
        } else {
            this.create.emit(this.maintenance);
        }
    }

    closeWindow() {
        this.close.emit();
    }
    
}
