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
var http_1 = require('@angular/http');
require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var Observable_1 = require('rxjs/Observable');
var FlatService = (function () {
    function FlatService(http) {
        this.http = http;
        this.apiUrl = 'api/Flat/';
    }
    FlatService.prototype.getFlats = function () {
        return this.http.get(this.apiUrl + 'GetFlats')
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    FlatService.prototype.createFlat = function (newFlat) {
        console.log("Creating new flat");
        return this.http.post(this.apiUrl + 'AddFlat/', newFlat)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    FlatService.prototype.deleteFlat = function (flatId) {
        return this.http.delete(this.apiUrl + "DeleteFlat/" + flatId)
            .catch(this.handleError);
    };
    FlatService.prototype.updateFlat = function (flat) {
        return this.http.post(this.apiUrl + "UpdateFlat", flat)
            .catch(this.handleError);
    };
    FlatService.prototype.handleError = function (error) {
        console.error('Произошла ошибка', error);
        return Observable_1.Observable.throw(error.message || error);
    };
    FlatService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FlatService);
    return FlatService;
}());
exports.FlatService = FlatService;
//# sourceMappingURL=flat.service.js.map