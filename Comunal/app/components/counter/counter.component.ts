import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { staggerRightToLeft, staggerLeftToRight } from '../../animation/animations';

import { CounterService } from '../../services/counter.service';
import { CounterDataService } from '../../services/counterData.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';

import { Counter } from '../../models/counter';
import { CounterData } from '../../models/counterData';

@Component({
    moduleId: module.id,
    selector: 'counter-list',
    templateUrl: `counter.component.html`,
    animations: [
        staggerRightToLeft,
        staggerLeftToRight
    ]
})
export class CounterComponent implements OnInit  {
    myCounters: Counter[] = [];
    showCounterPanel: boolean = false;
    currentCounter: Counter;
    counterDatas: CounterData[];

    staggerCounterHistoryIndex: number = 1;

    constructor(
        private counterService: CounterService,
        private counterDataService: CounterDataService,
        private dialogService: DialogService,
        private authService: AuthService,
        private router: Router,
        private loaderService: LoaderService
    ) { }

    ngOnInit() {
        this.initCounterList();
    }

    initCounterList() {
        
        this.loaderService.display(true);
        this.counterService.getFlatCountersByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(counters => {
                this.loaderService.display(false);
                this.myCounters = counters;
            });
    }

    goToNewCounter() {
        this.currentCounter = null;
        this.showCounterPanel = true;
    }

    createNewCounter(newCounter: Counter) {
        newCounter.FlatId = this.authService.CurrentUser.Flat.Id;
        this.counterService.createCounter(newCounter)
            .subscribe(counter => {
                console.log(counter);
                this.myCounters.push(counter);
                this.showCounterPanel = false;
            });
    }

    editCounter(currentCounter: Counter, event: any) {
        event.stopPropagation();
        console.log(currentCounter);
        this.currentCounter = Object.assign({}, currentCounter);
        this.showCounterPanel = true;
    }

    editBill(counterData: CounterData) {
        this.router.navigate(['/bill', counterData.BillId, true]);
    }

    updateCounter(currentCounter: Counter) {
        console.log(currentCounter);
        this.showCounterPanel = false;
        this.counterService.updateCounter(currentCounter)
            .subscribe(res => {
                this.initCounterList();
            });
    }

    deleteCounter(currentCounter: Counter, event: any) {
        event.stopPropagation();

        this.dialogService.addDialog(ConfirmComponent, { title: "Подтвердите удаление счетчика", message: "Вы точно хотите удалить счетчик?" })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.counterService.deleteCounter(currentCounter.Id)
                        .subscribe(res => {
                            let indexCounter = this.myCounters.indexOf(currentCounter);
                            if (indexCounter > -1) {
                                this.myCounters.splice(indexCounter, 1);
                            }

                            if (currentCounter.Id == this.currentCounter.Id) {
                                this.showCounterPanel = false;
                            }
                        });
                }
            });
    }

    selectCounter(selectedCounter: Counter) {
        this.myCounters.forEach(couner => couner.Selected = false);
        selectedCounter.Selected = true;
        
        this.currentCounter = selectedCounter;

        // get history
        this.counterDataService.getCounterDatasByCounterId(selectedCounter.Id)
            .subscribe(counterDatas => {
                this.staggerCounterHistoryIndex++;
                this.counterDatas = counterDatas;
            });
    }

    
}
