import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BillService } from '../../../services/bill.service';

import { Bill } from '../../../models/bill';

@Component({
    moduleId: module.id,
    selector: 'bill-detail',
    templateUrl: `bill-detail.component.html`,
})
export class BillDetatilComponent implements OnInit  {
    //@Output() create: EventEmitter<Bill> = new EventEmitter();
    //@Output() update: EventEmitter<Bill> = new EventEmitter();
    //@Output() close: EventEmitter<any> = new EventEmitter();
    //@Input() bill: Bill;

    //billType: any;
    //userName: any;

    allMonthes: any[] = [];
    allYears: any[] = [];

    constructor(
        private billService: BillService,
        private route: ActivatedRoute
    ) {
        this.allMonthes = [
            { Id: 0, Name: 'Январь' },
            { Id: 1, Name: 'Февраль' },
            { Id: 2, Name: 'Март' },
            { Id: 3, Name: 'Апрель' },
            { Id: 4, Name: 'Май' },
            { Id: 5, Name: 'Июнь' },
            { Id: 6, Name: 'Июль' },
            { Id: 7, Name: 'Август' },
            { Id: 8, Name: 'Сентябрь' },
            { Id: 9, Name: 'Октябрь' },
            { Id: 10, Name: 'Ноябрь' },
            { Id: 11, Name: 'Декабрь' },
        ];

        this.allYears = [];
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();

        for (var year = currentYear - 10; year < currentYear; year++) {
            this.allYears.push(year);
        }
    }

    ngOnInit() {
        //if (!this.bill) {
        //    this.bill = new Bill();
        //}
    }

    saveBill() {
        //if (this.bill.Id) {
        //    this.update.emit(this.bill);
        //} else {
        //    this.create.emit(this.bill);
        //}
    }

    //closeWindow() {
    //    this.close.emit();
    //}
    
}
