"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var confirm_component_1 = require('../../modals/confirm/confirm.component');
var flat_service_1 = require('../../services/flat.service');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var FlatComponent = (function () {
    function FlatComponent(flatService, dialogService) {
        this.flatService = flatService;
        this.dialogService = dialogService;
        this.myFlats = [];
        this.showFlatPanel = false;
    }
    FlatComponent.prototype.ngOnInit = function () {
        this.initFlatList();
    };
    FlatComponent.prototype.initFlatList = function () {
        var _this = this;
        this.flatService.getFlats()
            .subscribe(function (flats) {
            _this.myFlats = flats;
        });
    };
    FlatComponent.prototype.goToNewFlat = function () {
        this.currentFlat = null;
        this.showFlatPanel = true;
    };
    FlatComponent.prototype.createNewFlat = function (newFlat) {
        var _this = this;
        this.flatService.createFlat(newFlat)
            .subscribe(function (flat) {
            console.log(flat);
            _this.myFlats.push(flat);
            _this.showFlatPanel = false;
        });
    };
    FlatComponent.prototype.editFlat = function (currentFlat) {
        console.log(currentFlat);
        this.currentFlat = Object.assign({}, currentFlat);
        this.showFlatPanel = true;
    };
    FlatComponent.prototype.updateFlat = function (currentFlat) {
        var _this = this;
        console.log(currentFlat);
        this.showFlatPanel = false;
        this.flatService.updateFlat(currentFlat)
            .subscribe(function (res) {
            _this.initFlatList();
        });
    };
    FlatComponent.prototype.deleteFlat = function (currentFlat) {
        var _this = this;
        console.log(currentFlat);
        this.dialogService.addDialog(confirm_component_1.ConfirmComponent, { title: "Подтвердите удаление квартиры", message: "Вы точно хотите удалить квартиру?" })
            .subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.flatService.deleteFlat(currentFlat.Id)
                    .subscribe(function (res) {
                    var indexFlat = _this.myFlats.indexOf(currentFlat);
                    if (indexFlat > -1) {
                        _this.myFlats.splice(indexFlat, 1);
                    }
                    if (currentFlat.Id == _this.currentFlat.Id) {
                        _this.showFlatPanel = false;
                    }
                });
            }
        });
    };
    FlatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'flat-list',
            templateUrl: "flat.component.html",
        }), 
        __metadata('design:paramtypes', [flat_service_1.FlatService, ng2_bootstrap_modal_1.DialogService])
    ], FlatComponent);
    return FlatComponent;
}());
exports.FlatComponent = FlatComponent;
//# sourceMappingURL=flat.component.js.map