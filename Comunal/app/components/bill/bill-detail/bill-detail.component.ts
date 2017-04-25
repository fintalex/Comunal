import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditCounterDataComponent } from '../../../helpers/editCounterData/editCounterData.component';

import { BillService } from '../../../services/bill.service';
import { CounterDataService } from '../../../services/counterData.service';
import { MaintenanceDataService } from '../../../services/maintenanceData.service';
import { AuthService } from '../../../services/auth.service';
import { DialogService } from 'ng2-bootstrap-modal';

import { Bill } from '../../../models/bill';
import { CounterData } from '../../../models/counterData';
import { MaintenanceData } from '../../../models/maintenanceData';

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

    allMonthes: any[] = [];
    allYears: any[] = [];

    currentBill: Bill;
    counterDatas: CounterData[] = [];
    maintenanceDatas: MaintenanceData[] = [];

    constructor(
        private billService: BillService,
        private route: ActivatedRoute,
        private authService: AuthService,
        private counterDataService: CounterDataService,
        private maintenanceDataService: MaintenanceDataService,
        private dialogService: DialogService,
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

            this.counterDataService.getCounterDatasByBillId(billId)
                .subscribe(counterDatas => {
                    this.counterDatas = counterDatas;
                });

            this.maintenanceDataService.getMaintenanceDatasByBillId(billId)
                .subscribe(maintenanceDatas => {
                    this.maintenanceDatas = maintenanceDatas;
                });
        } else {
            var curDate = new Date();
            this.currentBill = new Bill(curDate, curDate.getMonth(), curDate.getFullYear(), this.authService.CurrentUser.Flat.Id, 0, 0, null);

            this.counterDataService.getCounterDatasForNewBill(this.authService.CurrentUser.Flat.Id)
                .subscribe(newCounterDatas => {
                    this.counterDatas = newCounterDatas;
                });
            this.maintenanceDataService.getMaintenanceDatasForNewBill(this.authService.CurrentUser.Flat.Id)
                .subscribe(newMaintenanceDatas => {
                    this.maintenanceDatas = newMaintenanceDatas;
                });
        }
    }

    saveBill() {
        
    }

    editCounterData(counterData: CounterData) {
        
        var dataForModalWindow = { dateDay: 1, dateMonth: counterData.ReadingDateMonth, dateYear: counterData.ReadingDateYear, reading: counterData.Reading };
        this.dialogService.addDialog(EditCounterDataComponent, dataForModalWindow)
            .subscribe((editedCounterData) => {
                counterData.Reading = editedCounterData;
            });
    }
    
}
