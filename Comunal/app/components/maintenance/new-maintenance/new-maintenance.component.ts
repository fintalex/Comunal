import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MaintenanceService } from '../../../services/maintenance.service';

import { Maintenance } from '../../../models/maintenance';

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

    constructor(
        private maintenanceService: MaintenanceService
    ) { }

    ngOnInit() {
        if (!this.maintenance) {
            this.maintenance = new Maintenance();
        }
    }

    saveMaintenance() {
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
