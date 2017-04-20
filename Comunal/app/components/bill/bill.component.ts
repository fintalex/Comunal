import { Component, OnInit } from '@angular/core';

import { BillService } from '../../services/bill.service';
import { AuthService } from '../../services/auth.service';

import { Bill } from '../../models/bill';

@Component({
    moduleId: module.id,
    selector: 'bill-list',
    templateUrl: `bill.component.html`,
})
export class BillComponent implements OnInit  {
    myBills: Bill[] = [];
    showBillPanel: boolean = false;
    currentBill: Bill;

    constructor(
        private billService: BillService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initBillList();
    }

    initBillList() {
        this.billService.getFlatBillsByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(bills => {
                this.myBills = bills;
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

    editBill(currentBill: Bill, event: any) {
        event.stopPropagation();
        console.log(currentBill);
        this.currentBill = Object.assign({}, currentBill);
        this.showBillPanel = true;
    }

    updateBill(currentBill: Bill) {
        console.log(currentBill);
        this.showBillPanel = false;
        this.billService.updateBill(currentBill)
            .subscribe(res => {
                this.initBillList();
            });
    }
    

    selectBill(selectedBill: Bill) {
        this.myBills.forEach(couner => couner.Selected = false);
        selectedBill.Selected = true;
    }
}
