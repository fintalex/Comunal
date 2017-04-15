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
    tarifTypes: IMultiSelectOption[] = [];

    constructor(
        private counterService: CounterService
    ) { }

    ngOnInit() {
        if (!this.counter) {
            this.counter = new Counter();
        }

        this.tarifTypes = [
            { id: 1, name: 'Простой' },
            { id: 2, name: 'Двухставочный' },
            { id: 3, name: 'Трехставочный' },
        ];
    }

    saveCounter() {
        if (this.counter.Id) {
            this.update.emit(this.counter);
        } else {
            this.create.emit(this.counter);
        }
    }

    closeWindow() {
        this.close.emit();
    }

    onTarifChange() {
        // display other fields for tarif
    }

    myTexts: IMultiSelectTexts = {
        checkAll: 'Выбрать все',
        uncheckAll: 'Снять все',
        checked: 'выбран',
        checkedPlural: 'выбрано',
        searchPlaceholder: 'Поиск...',
        defaultTitle: 'Выбрать',
        allSelected: 'Выбрать все',
    };

    tariffTypeSetting: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'glyphicon',
        buttonClasses: 'form-control',
        selectionLimit: 1,
        closeOnSelect: true,
        autoUnselect: true,
        fixedTitle: false,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
    };
}
