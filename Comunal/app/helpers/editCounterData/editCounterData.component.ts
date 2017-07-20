import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DataService } from '../../services/data.service';
import { CounterDataService } from '../../services/counterData.service';
import { CounterService } from '../../services/counter.service';

import { CounterData } from '../../models/counterData';
import { Counter } from '../../models/counter';

export interface EditCounterDataModel {
    counterData: CounterData
}

@Component({
    moduleId: module.id,
    selector: 'editCounterData',
    templateUrl: `editCounterData.component.html`,
})
export class EditCounterDataComponent extends DialogComponent<EditCounterDataModel, any> implements  OnInit { 
    counterData: CounterData;
    currentCounter: Counter;
    showCounterPanel: boolean = false;
    counterDataBefore: {} = {};

    allMonthes: any[] = [];
    allYears: any[] = [];
    allDays: any[] = [];

    tarifUpdated: boolean = false;
    counterForUpdate: Counter;

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
        private dataService: DataService,
        private counterDataService: CounterDataService,
        private counterService: CounterService) {
        super(dialogService);
    }

    ngOnInit() {
        Object.assign(this.counterDataBefore, this.counterData);
        this.counterData.Reading = null;
        this.allMonthes = this.dataService.getAllMonthes();
        this.allYears = this.dataService.getAllYears(10);
        this.allDays = this.dataService.getAllDays(this.counterData.ReadingDateMonth, this.counterData.ReadingDateYear);
    }
    
    cancel() {
        this.result = this.counterDataBefore;
        this.close();
    }

    apply() {
        if (this.counterDataBefore > this.counterData) {
            return;
        } else {

            if (this.tarifUpdated) {
                if (this.counterData.BillId) {
                    this.counterDataService.changeTarif(this.counterData)
                        .subscribe(res => {
                            console.log(res);
                            this.result = this.counterData;
                            this.close();
                        });
                } else {
                    this.counterService.updateCounter(this.counterForUpdate)
                        .subscribe(res => {
                            console.log(res);
                            this.result = this.counterData;
                            this.close();
                        });
                }
            } else {
                this.result = this.counterData;
                this.close();
            }
        }
    }

    goToEditTarifCounter() {
        this.currentCounter = new Counter(this.counterData.CounterName, 0, this.counterData.CounterTypeId, this.counterData.EnableODN, null, 0, this.counterData.CounterTarifId);
        this.currentCounter.Tarif1 = this.counterData.Tarif1;
        this.currentCounter.Tarif2 = this.counterData.Tarif2;
        this.currentCounter.Tarif3 = this.counterData.Tarif3;
        this.currentCounter.Limit1 = this.counterData.Limit1;
        this.currentCounter.Limit2 = this.counterData.Limit2;
        this.currentCounter.TarifCount = this.counterData.TarifCount;
        this.currentCounter.Id = this.counterData.CounterId;
        this.currentCounter.EditTarifOnly = true;
        this.showCounterPanel = true;
    }

    updateCounter(currentCounter: Counter) {
        
        this.showCounterPanel = false;

        this.counterData.Tarif1 = currentCounter.Tarif1;
        this.counterData.Tarif2 = currentCounter.Tarif2;
        this.counterData.Tarif3 = currentCounter.Tarif3;
        this.counterData.Limit1 = currentCounter.Limit1;
        this.counterData.Limit2 = currentCounter.Limit2;
        this.counterData.TarifCount = currentCounter.TarifCount;

        this.tarifUpdated = true;
        this.counterForUpdate = new Counter();
        Object.assign(this.counterForUpdate, currentCounter);
    }
}

