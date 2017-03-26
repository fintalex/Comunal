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
// =============== Modules ==========================
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var platform_browser_1 = require('@angular/platform-browser');
var app_routing_1 = require('./app.routing');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var ng2_bootstrap_modal_1 = require('ng2-bootstrap-modal');
// =============== App Component ====================
var app_component_1 = require('./app.component');
var navbar_component_1 = require('./components/navbar/navbar.component');
var about_component_1 = require('./components/about/about.component');
var flat_component_1 = require('./components/flat/flat.component');
var new_flat_component_1 = require('./components/flat/new-flat.component/new-flat.component');
var counter_component_1 = require('./components/counter/counter.component');
// =============== Helo Components ==========================
var confirm_component_1 = require('./modals/confirm/confirm.component');
// =============== Services ==========================
var flat_service_1 = require('./services/flat.service');
var counter_service_1 = require('./services/counter.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                app_routing_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                ng2_bootstrap_modal_1.BootstrapModalModule.forRoot({ container: document.body })
            ],
            declarations: [
                app_component_1.AppComponent,
                navbar_component_1.NavbarComponent,
                about_component_1.AboutComponent,
                flat_component_1.FlatComponent,
                new_flat_component_1.NewFlatComponent,
                counter_component_1.CounterComponent,
                confirm_component_1.ConfirmComponent
            ],
            entryComponents: [
                confirm_component_1.ConfirmComponent
            ],
            providers: [
                flat_service_1.FlatService,
                counter_service_1.CounterService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map