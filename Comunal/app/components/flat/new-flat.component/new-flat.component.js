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
var flat_service_1 = require('../../../services/flat.service');
var flats_1 = require('../../../models/flats');
var NewFlatComponent = (function () {
    function NewFlatComponent(flatService) {
        this.flatService = flatService;
        this.create = new core_1.EventEmitter();
        this.update = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
    }
    NewFlatComponent.prototype.ngOnInit = function () {
        if (!this.flat) {
            this.flat = new flats_1.Flat();
        }
    };
    NewFlatComponent.prototype.saveFlat = function () {
        //var newFlat = new Flat(this.name, this.address);
        if (this.flat.Id) {
            this.update.emit(this.flat);
        }
        else {
            this.create.emit(this.flat);
        }
    };
    NewFlatComponent.prototype.closeWindow = function () {
        this.close.emit();
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewFlatComponent.prototype, "create", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewFlatComponent.prototype, "update", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewFlatComponent.prototype, "close", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', flats_1.Flat)
    ], NewFlatComponent.prototype, "flat", void 0);
    NewFlatComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'new-flat',
            templateUrl: "./new-flat.component.html",
        }), 
        __metadata('design:paramtypes', [flat_service_1.FlatService])
    ], NewFlatComponent);
    return NewFlatComponent;
}());
exports.NewFlatComponent = NewFlatComponent;
//# sourceMappingURL=new-flat.component.js.map