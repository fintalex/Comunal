import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BillService } from '../../../services/bill.service';

import { Bill } from '../../../models/bill';

@Component({
    moduleId: module.id,
    selector: 'new-bill',
    templateUrl: `new-bill.component.html`,
})
export class NewBillComponent implements OnInit  {
    @Output() create: EventEmitter<Bill> = new EventEmitter();
    @Output() update: EventEmitter<Bill> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() bill: Bill;

    billType: any;
    userName: any;

    constructor(
        private billService: BillService
    ) { }

    ngOnInit() {
        if (!this.bill) {
            this.bill = new Bill();
        }
    }

    saveBill() {
        if (this.bill.Id) {
            this.update.emit(this.bill);
        } else {
            this.create.emit(this.bill);
        }
    }

    closeWindow() {
        this.close.emit();
    }
    
}
