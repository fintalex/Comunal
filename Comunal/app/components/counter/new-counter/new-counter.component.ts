import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CounterService } from '../../../services/counter.service';

import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

import { Counter } from '../../../models/counter';

@Component({
    moduleId: module.id,
    selector: 'new-counter',
    templateUrl: `new-counter.component.html`,
})
export class NewCounterComponent implements OnInit  {
    @Output() create: EventEmitter<Counter> = new EventEmitter();
    @Output() update: EventEmitter<Counter> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() counter: Counter;

    counterType: any;
    userName: any;
    tarifTypes: any[] = [];
    counterTypes: any[] = [];

    constructor(
        private counterService: CounterService
    ) { }

    ngOnInit() {
        if (!this.counter) {
            this.counter = new Counter();
        }

        this.counter

        this.tarifTypes = [
            { Id: 1, Name: 'Простой' },
            { Id: 2, Name: 'Двухставочный' },
            { Id: 3, Name: 'Трехставочный' },
        ];

        this.counterTypes = [
            { Id: 1, Name: 'Холодная вода' },
            { Id: 2, Name: 'Горячая вода' },
            { Id: 3, Name: 'Электричество' },
            { Id: 4, Name: 'Газ' },
            { Id: 5, Name: 'Отопление' },
            { Id: 6, Name: 'Моторесурс' }
        ];
    }

    saveCounter() {
        //this.counter.TarifCount = this.counter.TarifCount[0];
        //this.counter.CounterTypeId = this.counter.CounterTypeId[0];
        if (this.counter.Id) {
            this.update.emit(this.counter);
        } else {
            this.create.emit(this.counter);
        }
    }

    closeWindow() {
        this.close.emit();
    }
    
    selectTexts: IMultiSelectTexts = {
        checkAll: 'Выбрать все',
        uncheckAll: 'Снять все',
        checked: 'выбран',
        checkedPlural: 'выбрано',
        searchPlaceholder: 'Поиск...',
        defaultTitle: 'Выбрать',
        allSelected: 'Выбрать все',
    };

    selectSetting: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'glyphicon',
        buttonClasses: 'form-control',
        selectionLimit: 1,
        closeOnSelect: true,
        autoUnselect: true,
        fixedTitle: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '200px',
    };
}
