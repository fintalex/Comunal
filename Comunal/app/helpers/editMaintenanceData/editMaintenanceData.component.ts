import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { CounterService } from '../../services/counter.service';
import { AuthService } from '../../services/auth.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';


import { MaintenanceData } from '../../models/maintenanceData';
import { Maintenance } from '../../models/maintenance';

import * as _ from 'underscore';

export interface EditMaintenanceDataModel {
    maintenance: Maintenance
}

@Component({
    moduleId: module.id,
    selector: 'editMaintenanceData',
    templateUrl: `editMaintenanceData.component.html`,
})
export class EditMaintenanceDataComponent extends DialogComponent<EditMaintenanceDataModel, any> implements  OnInit { 
    maintenance: Maintenance;
    currentMaintenance: Maintenance;
    showMaintenancePanel: boolean = false;
    maintenanceDataBefore: {} = {};
    
    maintenanceType: any;

    maintenanceTypes: any[];

    myWaterCounters: IMultiSelectOption[] = [];

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
        private counterService: CounterService,
        private authService: AuthService
    ) {
        super(dialogService);
    }

    ngOnInit() {
        if (!this.maintenance) {
            this.maintenance = new Maintenance();
        }

        this.maintenanceTypes = [
            { Id: 1, Name: 'Фиксированная стоимость' },
            { Id: 2, Name: 'По количеству жильцов/площади' },
        ];

        this.counterService.getWaterCountersByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(waterCounters => {
                this.myWaterCounters = _.map(waterCounters, (wCounter) => {
                    return {
                        id: wCounter.Id,
                        name: wCounter.Name
                    }
                });

                if (this.myWaterCounters.length > 0) {
                    this.maintenanceTypes.push({ Id: 3, Name: 'Водоотведение' });
                    this.maintenanceTypes.push({ Id: 4, Name: 'Подогрев воды' });
                }
            });
    }
    
    cancel() {
        this.close();
    }

    apply() {
        this.result = this.maintenance;
        this.close();
    }




    onChange() {
        console.log('test');
    }

    onTypeChange() {
        this.maintenance.Counters = [];
        if (this.maintenance.MaintenanceTypeId == 4) {
            this.mySettings.selectionLimit = 1;
            this.mySettings.autoUnselect = true;
        } else if (this.maintenance.MaintenanceTypeId == 3) {
            this.mySettings.selectionLimit = 0;
            this.mySettings.autoUnselect = false;
            this.myWaterCounters.length
        }


    }

    mySettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'glyphicon',
        buttonClasses: 'form-control',
        selectionLimit: 0,
        closeOnSelect: false,
        autoUnselect: true,
        showCheckAll: false,
        showUncheckAll: false,
        fixedTitle: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
    };

    myTexts: IMultiSelectTexts = {
        checkAll: 'Выбрать все',
        uncheckAll: 'Снять все',
        checked: 'выбран',
        checkedPlural: 'выбрано',
        searchPlaceholder: 'Поиск...',
        defaultTitle: 'Выбрать',
        allSelected: 'Выбрать все',
    };
}

