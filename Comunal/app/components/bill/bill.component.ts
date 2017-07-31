import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BillService } from '../../services/bill.service';
import { AuthService } from '../../services/auth.service';

import { Bill } from '../../models/bill';
import { CounterData } from '../../models/counterData';
import { MaintenanceData } from '../../models/maintenanceData';

@Component({
    moduleId: module.id,
    selector: 'bill-list',
    templateUrl: `bill.component.html`,
})
export class BillComponent implements OnInit  {
    myBills: Bill[] = [];
    showBillPanel: boolean = false;
    currentBill: Bill;

    loading: boolean = false;

    constructor(
        private billService: BillService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.initBillList();
    }

    initBillList() {
        this.loading = true;
        this.billService.getFlatBillsByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(bills => {
                this.myBills = bills;
                this.loading = false;
            });
    }

    goToNewBill() {
        this.currentBill = null;
        this.showBillPanel = true;
    }

    createNewBill(newBill: Bill) {
        newBill.FlatId = this.authService.CurrentUser.Flat.Id;
        this.billService.createBill(newBill)
            .subscribe(bill => {
                console.log(bill);
                this.myBills.push(bill);
                this.showBillPanel = false;
            });
    }

    editBill(currentBill: Bill) {
        event.stopPropagation();
        this.router.navigate(['/bill', currentBill.Id, true]);
    }

    updateBill(currentBill: Bill) {
        console.log(currentBill);
        this.showBillPanel = false;
        this.billService.updateBill(currentBill)
            .subscribe(res => {
                this.initBillList();
            });
    }

    showBill(currentBill: Bill) {
        this.router.navigate(['/bill', currentBill.Id, false ]);
    }
    

    selectBill(selectedBill: Bill) {
        this.myBills.forEach(couner => couner.Selected = false);
        selectedBill.Selected = true;
    }

    getSummForBill(counterDatas: CounterData[], maintenanceDatas: MaintenanceData[]) {
        return this.billService.getSummForBill(counterDatas, maintenanceDatas);
    }
}
