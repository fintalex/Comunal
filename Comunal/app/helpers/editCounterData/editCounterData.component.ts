import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DataService } from '../../services/data.service';
import { CounterDataService } from '../../services/counterData.service';

import { CounterData } from '../../models/counterData';
import { Counter } from '../../models/counter';

//export interface EditCounterDataModel {
//    counterData: {
//        dateDay: number,
//        dateMonth: number,
//        dateYear: number,
//        reading: number,
//    }
//}

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

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
        private dataService: DataService,
        private counterDataService: CounterDataService) {
        super(dialogService);
    }

    ngOnInit() {
        Object.assign(this.counterDataBefore, this.counterData);
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

        } else {
            this.result = this.counterData;
            this.close();
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
        this.showCounterPanel = true;
    }

    updateCounter(currentCounter: Counter) {
        console.log(currentCounter);
        this.showCounterPanel = false;
        //this.counterService.updateCounter(currentCounter)
        //    .subscribe(res => {
        //        this.initCounterList();
        //    });
    }
}

