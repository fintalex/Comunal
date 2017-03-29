import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { CounterService } from '../../services/counter.service';
import { DialogService } from 'ng2-bootstrap-modal';

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
        private dialogService: DialogService
    ) { }

    ngOnInit() {
        this.initCounterList();
    }

    initCounterList() {
        this.counterService.getCounters()
            .subscribe(counters => {
                this.myCounters = counters;
            });
    }

    goToNewCounter() {
        this.currentCounter = null;
        this.showCounterPanel = true;
    }

    createNewCounter(newCounter: Counter) {
        this.counterService.createCounter(newCounter)
            .subscribe(flat => {
                console.log(flat);
                this.myCounters.push(flat);
                this.showCounterPanel = false;
            });
    }

    editCounter(currentCounter: Counter) {
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

    deleteCounter(currentCounter: Counter) {
        console.log(currentCounter);

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
}
