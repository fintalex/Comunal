import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCounterDataComponent } from '../../../helpers/editCounterData/editCounterData.component';
import { EditMaintenanceDataComponent } from '../../../helpers/editMaintenanceData/editMaintenanceData.component';

import { BillService } from '../../../services/bill.service';
import { CounterDataService } from '../../../services/counterData.service';
import { MaintenanceDataService } from '../../../services/maintenanceData.service';
import { MaintenanceService } from '../../../services/maintenance.service';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { DialogService } from 'ng2-bootstrap-modal';

import { Bill } from '../../../models/bill';
import { CounterData } from '../../../models/counterData';
import { MaintenanceData } from '../../../models/maintenanceData';
import { Maintenance } from '../../../models/maintenance';

import * as _ from 'underscore';

@Component({
    moduleId: module.id,
    selector: 'bill-detail',
    templateUrl: `bill-detail.component.html`,
})
export class BillDetailComponent implements OnInit  {

    allMonthes: any[] = [];
    allYears: any[] = [];

    allBills: any[];

    billId: number;

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
        private maintenanceService: MaintenanceService,
        private dialogService: DialogService,
    ) {    }

    ngOnInit() {
        this.allMonthes = this.dataService.getAllMonthes();
        this.allYears = this.dataService.getAllYears(10);

        var curDate = new Date();
        this.currentBill = new Bill(curDate, curDate.getMonth(), curDate.getFullYear(), this.authService.CurrentUser.Flat.Id, 0, 0, null);
        

        this.billId = this.route.snapshot.params['id'];

        if (!this.billId || this.billId == 0) {
            this.billService.getFlatBillsByFlatId(this.authService.CurrentUser.Flat.Id)
                .subscribe(allBills => {
                    this.allBills = allBills;

                    if (this.allBills && this.allBills.length > 0) {
                        var nextAvailableDate = new Date(this.allBills[0].InvoiceDate); // first bills is with last InvoiceDate (sorted by descending on the server)
                        nextAvailableDate.setMonth(nextAvailableDate.getMonth() + 1);

                        this.currentBill = new Bill(nextAvailableDate, nextAvailableDate.getMonth(), nextAvailableDate.getFullYear(), this.authService.CurrentUser.Flat.Id, 0, 0, null);
                    }

                    this.getBillDetails();
                });
        } else {
            this.getBillDetails();
        }
    }

    getBillDetails() {
        

        if (this.billId && this.billId != 0) {
            this.billService.getBill(this.billId)
                .subscribe(curBill => {
                    this.currentBill = curBill;
                    this.summForBill();
                });

            this.counterDataService.getCounterDatasByBillId(this.billId)
                .subscribe(counterDatas => {
                    this.counterDatas = counterDatas;
                    this.summForBill();
                });

            this.maintenanceDataService.getMaintenanceDatasByBillId(this.billId)
                .subscribe(maintenanceDatas => {
                    this.maintenanceDatas = maintenanceDatas;
                    this.summForBill();
                });
        } else {

            // here we will must implement $q.all
            this.counterDataService.getCounterDatasForNewBill(this.authService.CurrentUser.Flat.Id, this.currentBill.InvoiceDateYear, this.currentBill.InvoiceDateMonth)
                .subscribe(newCounterDatas => {
                    this.counterDatas = newCounterDatas;
                    this.summForBill();
                });
            this.maintenanceDataService.getMaintenanceDatasForNewBill(this.authService.CurrentUser.Flat.Id)
                .subscribe(newMaintenanceDatas => {
                    this.maintenanceDatas = newMaintenanceDatas;
                    this.summForBill();
                });
        }
    }

    checkExistMonth(month: number, year: number): boolean {
        var existMonth = _.some(this.allBills, (bill: Bill) => {
            var invoiceDate = new Date(bill.InvoiceDate);
            return invoiceDate.getMonth() == month && invoiceDate.getFullYear() == year;
        });
        return !existMonth;
    }

    getExistingMonths() {
        return _.filter(this.allMonthes, (month: any) => {
            return this.checkExistMonth(month.Id, this.currentBill.InvoiceDateYear);
        });
    }

    editCounterData(counterData: CounterData) {
        
        var dataForModalWindow = {
            counterData: {}
        };

        Object.assign(dataForModalWindow.counterData, counterData);

        this.dialogService.addDialog(EditCounterDataComponent,  dataForModalWindow)
            .subscribe((editedCounterData) => {
                //Object.assign(counterData, editedCounterData);
                counterData.Reading = parseFloat(editedCounterData.Reading);
                counterData.ReadingDateDay = editedCounterData.ReadingDateDay;
                counterData.ReadingDateMonth = editedCounterData.ReadingDateMonth;
                counterData.ReadingDateYear = editedCounterData.ReadingDateYear;
                counterData.ReadingODN = editedCounterData.ReadingODN;

                counterData.Tarif1 = parseFloat(editedCounterData.Tarif1);
                counterData.Tarif2 = parseFloat(editedCounterData.Tarif2);
                counterData.Tarif3 = parseFloat(editedCounterData.Tarif3);
                counterData.Limit1 = parseFloat(editedCounterData.Limit1);
                counterData.Limit2 = parseFloat(editedCounterData.Limit2);

                this.summForBill();
            });
    }

    editMaintenanceData(maintData: MaintenanceData) {
        var curMaintenance = maintData.Maintenance;
        curMaintenance.Tarif = maintData.Tarif;
        curMaintenance.Id = maintData.MaintenanceId;
        
        this.maintenanceService.openMaintenanceWindow(curMaintenance)
            .subscribe((resMaintenance: any) => {

                maintData.Tarif = parseFloat(resMaintenance.Tarif);











                this.summForBill();
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

    getStringCurrentData(countData: CounterData) {
        var result = countData.Reading ? (countData.Reading).toFixed(2) : (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : 0).toFixed(2) +
            "(+" + countData.Reading ? (countData.Reading - (countData.LastCounterDataDTO ? countData.LastCounterDataDTO.Reading : 0)).toFixed(2) : 0;

        return result;
    }

    summForBill() {
        this.currentBill.Summ = 0;

        this.currentBill.Summ = this.billService.getSummForBill(this.counterDatas, this.maintenanceDatas);
    }

    getForPayment() {
        return this.currentBill.Summ + this.currentBill.Recalculation + this.currentBill.Fine;
    }
    
}
