import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { DataService } from '../../services/data.service';

export interface EditCounterDataModel {
    dateDay: number;
    dateMonth: number;
    dateYear: number;
    reading: number;
}

@Component({
    moduleId: module.id,
    selector: 'editCounterData',
    templateUrl: `editCounterData.component.html`,
})
export class EditCounterDataComponent extends DialogComponent<EditCounterDataModel, any> implements EditCounterDataModel, OnInit { 
    dateDay: number;
    dateMonth: number;
    dateYear: number;
    reading: number;

    readingBefore: number;

    allMonthes: any[] = [];
    allYears: any[] = [];
    allDays: any[] = [];

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService,
                private dataService: DataService) {
        super(dialogService);
    }

    ngOnInit() {
        this.allMonthes = this.dataService.getAllMonthes();
        this.allYears = this.dataService.getAllYears(10);
        this.allDays = this.dataService.getAllDays(this.dateMonth, this.dateYear);
    }
    
    cancel() {
        this.result = this.readingBefore;
        this.close();
    }

    apply() {
        this.result = this.reading;
        this.close();
    }
}

