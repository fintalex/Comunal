// =============== Modules ==========================
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MaterialModule } from '@angular/material';

// =============== App Component ====================
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { FlatComponent } from './components/flat/flat.component';
import { NewFlatComponent } from './components/flat/new-flat.component/new-flat.component';
import { CounterComponent } from './components/counter/counter.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BillComponent } from './components/bill/bill.component';
import { NewCounterComponent } from './components/counter/new-counter/new-counter.component';
import { NewMaintenanceComponent } from './components/maintenance/new-maintenance/new-maintenance.component';
import { BillDetatilComponent } from './components/bill/bill-detail/bill-detail.component';
                                           
// =============== Help Components ==========================
import { ConfirmComponent } from './helpers/confirm/confirm.component';

// =============== Services ==========================
import { FlatService } from './services/flat.service';
import { CounterService } from './services/counter.service';
import { MaintenanceService } from './services/maintenance.service';
import { BillService } from './services/bill.service';
import { GuardService } from './services/guard.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        BootstrapModalModule.forRoot({ container: document.body }),
        MultiselectDropdownModule,
        MaterialModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        AboutComponent,
        FlatComponent,
        NewFlatComponent, 
        CounterComponent,
        MaintenanceComponent,
        BillComponent,
        NewCounterComponent,
        NewMaintenanceComponent,
        BillDetatilComponent,
        ConfirmComponent
    ],
    entryComponents: [
        ConfirmComponent
    ],
    providers: [
        GuardService,
        UserService,
        AuthService,
        FlatService,
        CounterService,
        MaintenanceService,
        BillService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
