import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { trigger, state, style, transition, animate, keyframes, query, stagger, } from '@angular/animations';

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
        trigger('staggerCounter', [
            transition('* => *', [
                query('.clickable-row:enter', style({ opacity: 0 }), { optional: true }),

                query('.clickable-row:enter', stagger('100ms', [
                    animate('300ms ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateX(-75px)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
                    ]))
                ]), { optional: true }),

                query(':leave', stagger('300ms', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateX(-75px)', offset: 1 }),
                    ]))
                ]), { optional: true }),
            ])
        ]),
        trigger('staggerCounterHistory', [
            transition('* => *', [
                query('tr:enter', style({ opacity: 0 }), { optional: true }),

                query('tr:enter', stagger('100ms', [
                    animate('200ms ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-47px)', offset: 0 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
                    ]))
                ]), { optional: true })
            ])
        ])
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
                setTimeout(() => {
                    this.loaderService.display(false);
                    this.myCounters = counters;
                }, 1000);
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
