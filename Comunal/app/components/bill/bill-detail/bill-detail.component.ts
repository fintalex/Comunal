import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCounterDataComponent } from '../../../helpers/editCounterData/editCounterData.component';

import { BillService } from '../../../services/bill.service';
import { CounterDataService } from '../../../services/counterData.service';
import { MaintenanceDataService } from '../../../services/maintenanceData.service';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
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

    allMonthes: any[] = [];
    allYears: any[] = [];

    currentBill: Bill;
    counterDatas: CounterData[] = [];
    maintenanceDatas: MaintenanceData[] = [];

    constructor(
        private billService: BillService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private dataService: DataService,
        private counterDataService: CounterDataService,
        private maintenanceDataService: MaintenanceDataService,
        private dialogService: DialogService,
    ) {    }

    ngOnInit() {
        this.allMonthes = this.dataService.getAllMonthes();
        this.allYears = this.dataService.getAllYears(10);

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
    
    editCounterData(counterData: CounterData) {
        
        var dataForModalWindow = {
            counterData: {
                dateDay: counterData.ReadingDateDay,
                dateMonth: counterData.ReadingDateMonth,
                dateYear: counterData.ReadingDateYear,
                reading: counterData.Reading ? counterData.Reading : counterData.LastReading
            }
        };
        this.dialogService.addDialog(EditCounterDataComponent,  dataForModalWindow)
            .subscribe((editedCounterData) => {
                counterData.Reading = parseFloat(editedCounterData.reading);
                counterData.ReadingDateDay = editedCounterData.dateDay;
                counterData.ReadingDateMonth = editedCounterData.dateMonth;
                counterData.ReadingDateYear = editedCounterData.dateYear;
            });
    }

    saveBill() {
        this.currentBill.CounterDatas = this.counterDatas;
        this.currentBill.MaintenanceDatas = this.maintenanceDatas;

        if (this.currentBill.Id) {
            this.billService.updateBill(this.currentBill)
                .subscribe((result) => {
                    this.router.navigate(['/bills']);
                });
        } else {
            this.billService.createBill(this.currentBill)
                .subscribe((result) => {
                    this.router.navigate(['/bills']);
                });
        }
        
    }

    getSumForCounter(countData: CounterData) {
        var summ = 0;
        var currentPlusReading = countData.Reading - countData.LastReading;

        if (!countData.Limit1 || countData.Limit1 == 0 || currentPlusReading <= countData.Limit1) {
            return currentPlusReading * countData.Tarif1;
        }

        if (currentPlusReading > countData.Limit1) {
            summ += countData.Limit1 * countData.Tarif1;
        }

        if (!countData.Limit2 || countData.Limit2 == 0 || currentPlusReading <= countData.Limit2) {
            summ += (currentPlusReading - countData.Limit1) * countData.Tarif2;
        } else {
            summ += (countData.Limit2 - countData.Limit1) * countData.Tarif2;
            summ += (currentPlusReading - countData.Limit2) * countData.Tarif3;
        }

        return summ;
    }
    
}
