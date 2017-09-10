import { Component, OnInit } from '@angular/core';
import { ConfirmComponent } from '../../helpers/confirm/confirm.component';

import { staggerLeftToRight } from '../../animation/animations';

import { FlatService } from '../../services/flat.service';
import { DialogService } from 'ng2-bootstrap-modal';
import { AuthService } from '../../services/auth.service';

import { Flat } from '../../models/flats';

@Component({
    moduleId: module.id,
    selector: 'flat-list',
    templateUrl: `flat.component.html`,
    animations: [staggerLeftToRight]
})
export class FlatComponent implements OnInit {
    myFlats: Flat[] = [];

    showFlatPanel: boolean = false;

    currentFlat: Flat;

    constructor(
        private flatService: FlatService,
        private dialogService: DialogService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.initFlatList();
    }

    initFlatList() {
        this.flatService.getFlats(this.authService.CurrentUser.Id)
            .subscribe(flats => {
                this.myFlats = flats;
            });
    }

    goToNewFlat() {
        this.currentFlat = null;
        this.showFlatPanel = true;
    }

    createNewFlat(newFlat: Flat) {
        newFlat.UserId = this.authService.CurrentUser.Id;
        this.flatService.createFlat(newFlat)
            .subscribe(flat => {
                this.myFlats.push(flat);
                this.showFlatPanel = false;

                if (this.myFlats.length == 1) {
                    this.flatService.selectFlat(flat)
                        .subscribe(() => { });;
                }
            });
    }

    editFlat(currentFlat: Flat, event: any) {
        event.stopPropagation();
        this.currentFlat = Object.assign({}, currentFlat);
        this.showFlatPanel = true;
    }

    updateFlat(currentFlat: Flat) {
        this.showFlatPanel = false;
        this.flatService.updateFlat(currentFlat)
            .subscribe(res => {
                this.initFlatList();
            });
    }

    deleteFlat(currentFlat: Flat, event: any) {
        event.stopPropagation();
        this.dialogService.addDialog(ConfirmComponent, { title: "Подтвердите удаление квартиры", message: "Вы точно хотите удалить квартиру?" })
            .subscribe((isConfirmed) => {
                if (isConfirmed) {
                    this.flatService.deleteFlat(currentFlat.Id)
                        .subscribe(res => {
                            let indexFlat = this.myFlats.indexOf(currentFlat);
                            if (indexFlat > -1) {
                                this.myFlats.splice(indexFlat, 1);
                            }

                            if (this.currentFlat && currentFlat.Id == this.currentFlat.Id) {
                                this.showFlatPanel = false;
                            }

                            if (currentFlat.Selected) {
                                var curSelectedFlat = this.myFlats.length > 0 ? this.myFlats[0] : null;
                                this.flatService.selectFlat(curSelectedFlat)
                                    .subscribe(() => {
                                        console.log();
                                    });
                            }
                        });
                }
            });
    }

    selectFlat(selectedFlat: Flat) {
        this.myFlats.forEach(flat => flat.Selected = false);
        this.flatService.selectFlat(selectedFlat)
            .subscribe(() => {
                console.log();
            });
    }

}