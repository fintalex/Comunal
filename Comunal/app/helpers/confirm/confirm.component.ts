
import { Component } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
    title: string;
    message: string;
}

@Component({
    moduleId: module.id,
    selector: 'confirm',
    templateUrl: `confirm.component.html`,
})
export class ConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel { 
    title: string;
    message: string;

    ///  https://www.npmjs.com/package/ng2-bootstrap-modal
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    confirm() {
        // we set dialog result as true on click on confirm button, 
        // then we can get dialog result from caller code 
        this.result = true;
        this.close();
    }
    cancel() {
        this.result = false;
        this.close();
    }
}

