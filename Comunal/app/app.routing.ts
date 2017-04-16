﻿import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { FlatComponent } from './components/flat/flat.component';
import { CounterComponent } from './components/counter/counter.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';
import { BillComponent } from './components/bill/bill.component';
import { BillDetatilComponent } from './components/bill/bill-detail/bill-detail.component';

import { GuardService } from './services/guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'about', component: AboutComponent},
    { path: 'myflats', component: FlatComponent, canActivate: [GuardService]  },
    { path: 'counters', component: CounterComponent, canActivate: [GuardService] },
    { path: 'maintenance', component: MaintenanceComponent, canActivate: [GuardService] },
    { path: 'bills', component: BillComponent, canActivate: [GuardService] },
    { path: 'bill/:id', component: BillDetatilComponent, canActivate: [GuardService] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'myflats' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}