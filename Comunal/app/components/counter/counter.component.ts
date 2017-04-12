import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { CounterService } from '../../services/counter.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';

import { Counter } from '../../models/counter';

@Component({
    moduleId: module.id,
    selector: 'counter-list',
    templateUrl: `counter.component.html`,
})
export class CounterComponent implements OnInit  {
    myCounters: Counter[] = [];
    showCounterPanel: boolean = false;
    currentCounter: Counter;

    constructor(
        private counterService: CounterService,
        private dialogService: DialogService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initCounterList();
    }

    initCounterList() {
        this.counterService.getFlatCountersByFlatId(this.authService.CurrentUser.Flat.Id)
            .subscribe(counters => {
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
    }
}
