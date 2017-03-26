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
var counter_service_1 = require('../../services/counter.service');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
var CounterComponent = (function () {
    function CounterComponent(counterService, dialogService) {
        this.counterService = counterService;
        this.dialogService = dialogService;
        this.myCounters = [];
        this.showCounterPanel = false;
    }
    CounterComponent.prototype.ngOnInit = function () {
        this.initCounterList();
    };
    CounterComponent.prototype.initCounterList = function () {
        var _this = this;
        this.counterService.getCounters()
            .subscribe(function (counters) {
            _this.myCounters = counters;
        });
    };
    CounterComponent.prototype.goToNewCounter = function () {
        this.currentCounter = null;
        this.showCounterPanel = true;
    };
    CounterComponent.prototype.createNewCounter = function (newCounter) {
        var _this = this;
        this.counterService.createCounter(newCounter)
            .subscribe(function (flat) {
            console.log(flat);
            _this.myCounters.push(flat);
            _this.showCounterPanel = false;
        });
    };
    CounterComponent.prototype.editCounter = function (currentCounter) {
        console.log(currentCounter);
        this.currentCounter = Object.assign({}, currentCounter);
        this.showCounterPanel = true;
    };
    CounterComponent.prototype.updateCounter = function (currentCounter) {
        var _this = this;
        console.log(currentCounter);
        this.showCounterPanel = false;
        this.counterService.updateCounter(currentCounter)
            .subscribe(function (res) {
            _this.initCounterList();
        });
    };
    CounterComponent.prototype.deleteCounter = function (currentCounter) {
        var _this = this;
        console.log(currentCounter);
        this.dialogService.addDialog(confirm_component_1.ConfirmComponent, { title: "Подтвердите удаление счетчика", message: "Вы точно хотите удалить счетчик?" })
            .subscribe(function (isConfirmed) {
            if (isConfirmed) {
                _this.counterService.deleteCounter(currentCounter.Id)
                    .subscribe(function (res) {
                    var indexCounter = _this.myCounters.indexOf(currentCounter);
                    if (indexCounter > -1) {
                        _this.myCounters.splice(indexCounter, 1);
                    }
                    if (currentCounter.Id == _this.currentCounter.Id) {
                        _this.showCounterPanel = false;
                    }
                });
            }
        });
    };
    CounterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'counter-list',
            templateUrl: "counter.component.html",
        }), 
        __metadata('design:paramtypes', [counter_service_1.CounterService, ng2_bootstrap_modal_1.DialogService])
    ], CounterComponent);
    return CounterComponent;
}());
exports.CounterComponent = CounterComponent;
//# sourceMappingURL=counter.component.js.map