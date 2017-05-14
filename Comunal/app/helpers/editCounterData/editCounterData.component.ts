import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DataService } from '../../services/data.service';

export interface EditCounterDataModel {
    counterData: {
        dateDay: number,
        dateMonth: number,
        dateYear: number,
        reading: number,
    }
}

@Component({
    moduleId: module.id,
    selector: 'editCounterData',
    templateUrl: `editCounterData.component.html`,
})
export class EditCounterDataComponent extends DialogComponent<EditCounterDataModel, any> implements EditCounterDataModel, OnInit { 
    counterData: {
        dateDay: number,
        dateMonth: number,
        dateYear: number,
        reading: number,
    }

    counterDataBefore: {};

    allMonthes: any[] = [];
    allYears: any[] = [];
    allDays: any[] = [];

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
                private dataService: DataService) {
        super(dialogService);
    }

    ngOnInit() {
        this.counterDataBefore = this.counterData;
        this.allMonthes = this.dataService.getAllMonthes();
        this.allYears = this.dataService.getAllYears(10);
        this.allDays = this.dataService.getAllDays(this.counterData.dateMonth, this.counterData.dateYear);


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

