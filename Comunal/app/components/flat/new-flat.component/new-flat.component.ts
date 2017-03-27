import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { FlatService } from '../../../services/flat.service';

import { Flat } from '../../../models/flats';

@Component({
    moduleId: module.id,
    selector: 'new-flat',
    templateUrl: `./new-flat.component.html`,
})
export class NewFlatComponent implements OnInit  {
    @Output() create: EventEmitter<Flat> = new EventEmitter();
    @Output() update: EventEmitter<Flat> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();
    @Input() flat: Flat;

    //currentFlat: Flat;

    //name: string;
    //address: string;

    constructor(private flatService: FlatService) { }

    ngOnInit() {
        if (!this.flat) {
            this.flat = new Flat();
        }
    }

    saveFlat() {
        //var newFlat = new Flat(this.name, this.address);
        if (this.flat.Id) {
            this.update.emit(this.flat);
        } else { 
            this.create.emit(this.flat);
        }
    }

    closeWindow() {
        this.close.emit();
    }
    
}