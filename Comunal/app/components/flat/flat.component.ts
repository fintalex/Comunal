import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

import { FlatService } from '../../services/flat.service';
import { DialogService } from 'ng2-bootstrap-modal';

import { Flat } from '../../models/flats';

@Component({
    moduleId: module.id,
    selector: 'flat-list',
    templateUrl: `flat.component.html`,
})
export class FlatComponent implements OnInit  {
    myFlats: Flat[] = [];

    showFlatPanel: boolean = false;

    currentFlat: Flat;

    constructor(
        private flatService: FlatService,
        private dialogService: DialogService
    ) {}

    ngOnInit() {
        this.initFlatList();
    }

    initFlatList() {
        this.flatService.getFlats()
            .subscribe(flats => {
                this.myFlats = flats;
            });
    }

    goToNewFlat() {
        this.currentFlat = null;
        this.showFlatPanel = true;
    }

    createNewFlat(newFlat: Flat) {
        this.flatService.createFlat(newFlat)
            .subscribe(flat => {
                console.log(flat);
                this.myFlats.push(flat);
                this.showFlatPanel = false;
            });
    }

    editFlat(currentFlat: Flat) {
        console.log(currentFlat);
        this.currentFlat = Object.assign({}, currentFlat);
        this.showFlatPanel = true;
    }

    updateFlat(currentFlat: Flat) {
        console.log(currentFlat);
        this.showFlatPanel = false;
        this.flatService.updateFlat(currentFlat)
            .subscribe(res => {
                this.initFlatList();
            });
    }

    deleteFlat(currentFlat: Flat) {
        console.log(currentFlat);

        this.dialogService.addDialog(ConfirmComponent, { title: "Подтвердите удаление квартиры", message: "Вы точно хотите удалить квартиру?" })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.flatService.deleteFlat(currentFlat.Id)
                        .subscribe(res => {
                            let indexFlat = this.myFlats.indexOf(currentFlat);
                            if (indexFlat > -1) {
                                this.myFlats.splice(indexFlat, 1);
                            }

                            if (currentFlat.Id == this.currentFlat.Id) {
                                this.showFlatPanel = false;
                            }
                        });
                }
            });
    }
    
}