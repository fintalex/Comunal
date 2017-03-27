import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CounterService } from '../../../services/counter.service';

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

    constructor(
        private counterService: CounterService
    ) { }

    ngOnInit() {
        if (!this.counter) {
            this.counter = new Counter();
        }
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
    
}
