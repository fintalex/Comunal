import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DataService } from '../../services/data.service';
import { CounterDataService } from '../../services/counterData.service';

import { CounterData } from '../../models/counterData';

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
}

