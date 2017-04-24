import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BillService } from '../../../services/bill.service';
import { CounterDataService } from '../../../services/counterData.service';
import { AuthService } from '../../../services/auth.service';

import { Bill } from '../../../models/bill';
import { CounterData } from '../../../models/counterData';

@Component({
    moduleId: module.id,
    selector: 'bill-detail',
    templateUrl: `bill-detail.component.html`,
})
export class BillDetailComponent implements OnInit  {
    //@Output() create: EventEmitter<Bill> = new EventEmitter();
    //@Output() update: EventEmitter<Bill> = new EventEmitter();
    //@Output() close: EventEmitter<any> = new EventEmitter();
    //@Input() bill: Bill;

    //billType: any;
    //userName: any;

    allMonthes: any[] = [];
    allYears: any[] = [];

    currentBill: Bill;
    counterDatas: CounterData[] = [];
    //counterDatasDTO: 
    //maintenanceDatasDTO: 

    constructor(
        private billService: BillService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private counterDataService: CounterDataService
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

        for (var year = currentYear - 10; year <= currentYear; year++) {
            this.allYears.push(year);
        }
    }

    ngOnInit() {
        var billId = this.route.snapshot.params['id'];

        if (billId && billId != 0) {
            this.billService.getBill(billId)
                .subscribe(curBill => {
                    this.currentBill = curBill;
                });

            this.counterDataService.getCounterDataForByBillId(billId)
                .subscribe(newCounterData => {
                    this.counterDatas = newCounterData;
                });
        } else {
            var curDate = new Date();
            this.currentBill = new Bill(curDate, curDate.getMonth(), curDate.getFullYear(), this.authService.CurrentUser.Flat.Id, 0, 0, null);
            this.counterDataService.getCounterDataForNewBill(this.authService.CurrentUser.Flat.Id)
                .subscribe(newCounterData => {
                    this.counterDatas = newCounterData;
                });
        }
    }

    saveBill() {
        //if (this.bill.Id) {
        //    this.update.emit(this.bill);
        //} else {
        //    this.create.emit(this.bill);
        //}
    }
    
}
