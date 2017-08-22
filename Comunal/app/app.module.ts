// =============== Modules ==========================
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MdIconModule, MdButtonModule, MdRadioButton, MdSliderModule, MdMenuModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { LoadingModule } from 'ngx-loading';

// =============== App Component ====================
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import { FlatComponent } from './components/flat/flat.component';
import { NewFlatComponent } from './components/flat/new-flat.component/new-flat.component';
import { CounterComponent } from './components/counter/counter.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BillComponent } from './components/bill/bill.component';
import { NewCounterComponent } from './components/counter/new-counter/new-counter.component';
import { NewMaintenanceComponent } from './components/maintenance/new-maintenance/new-maintenance.component';
import { BillDetailComponent } from './components/bill/bill-detail/bill-detail.component';

// =============== App Pipes ====================
import { DateRu } from './pipes/dateru.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { RoundPipe } from './pipes/round.pipe'
                                           
// =============== Help Components ==========================
import { ConfirmComponent } from './helpers/confirm/confirm.component';
import { EditCounterDataComponent } from './helpers/editCounterData/editCounterData.component';
import { EditMaintenanceDataComponent } from './helpers/editMaintenanceData/editMaintenanceData.component';

// =============== Services ==========================
import { FlatService } from './services/flat.service';
import { CounterService } from './services/counter.service';
import { CounterDataService } from './services/counterData.service';
import { MaintenanceService } from './services/maintenance.service';
import { MaintenanceDataService } from './services/maintenanceData.service';
import { BillService } from './services/bill.service';
import { GuardService } from './services/guard.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { LoaderService } from './services/loader.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        BootstrapModalModule.forRoot({ container: document.body }),
        MultiselectDropdownModule,
        ChartModule.forRoot(require('highcharts')),
        BrowserAnimationsModule,
        MdIconModule, MdButtonModule, MdRadioButton, MdSliderModule, MdMenuModule,
        //LoadingModule
    ],
    declarations: [
        // === pipes ====
        DateRu,
        CapitalizePipe,
        RoundPipe,

        // === Component ===
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        AboutComponent,
        HelpComponent,
        HomeComponent,
        FlatComponent,
        NewFlatComponent, 
        CounterComponent,
        MaintenanceComponent,
        BillComponent,
        NewCounterComponent,
        NewMaintenanceComponent,
        BillDetailComponent,
        // === helpers ====
        ConfirmComponent,
        EditCounterDataComponent,
        EditMaintenanceDataComponent
    ],
    entryComponents: [ // Need to be investigated
        ConfirmComponent,
        EditCounterDataComponent,
        EditMaintenanceDataComponent
    ],
    providers: [
        GuardService,
        UserService,
        AuthService,
        DataService,
        FlatService,
        CounterService,
        CounterDataService,
        MaintenanceDataService,
        MaintenanceService,
        BillService,
        LoaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
