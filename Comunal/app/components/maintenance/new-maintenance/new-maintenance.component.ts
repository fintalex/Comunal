import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MaintenanceService } from '../../../services/maintenance.service';
import { CounterService } from '../../../services/counter.service';
import { AuthService } from '../../../services/auth.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { Maintenance } from '../../../models/maintenance';
import { Counter } from '../../../models/counter';

import * as _ from 'underscore';

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
    //myWaterCounters: Counter[] = [];

    optionsModel: number[];
    myWaterCounters: IMultiSelectOption[] = [];

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
                this.myWaterCounters = _.map(waterCounters, (wCounter) => {
                    return {
                        id: wCounter.Id,
                        name: wCounter.Name
                    }
                });
            });
    }

    onChange() {
        console.log(this.optionsModel);
    }

    onTypeChange() {
        this.maintenance.Counters = [];
        if (this.maintenance.MaintenanceTypeId == 4) {
            this.mySettings.selectionLimit = 1;
            this.mySettings.autoUnselect = true;
        } else if (this.maintenance.MaintenanceTypeId == 3){
            this.mySettings.selectionLimit = 0;
            this.mySettings.autoUnselect = false;
            this.myWaterCounters.length
        }
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

    mySettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default btn-secondary',
        selectionLimit: 0,
        closeOnSelect: false,
        autoUnselect: false,
        showCheckAll: false,
        showUncheckAll: false,
        fixedTitle: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
        allSelected: 'All selected',
    };
    
}
