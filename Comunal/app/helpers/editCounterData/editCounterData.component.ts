
import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

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

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit() {
        this.readingBefore = this.reading;
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

