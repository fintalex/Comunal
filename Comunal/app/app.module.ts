// =============== Modules ==========================
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

// =============== App Component ====================
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { FlatComponent } from './components/flat/flat.component';
import { NewFlatComponent } from './components/flat/new-flat.component/new-flat.component';
import { CounterComponent } from './components/counter/counter.component';
import { NewCounterComponent } from './components/counter/new-counter/new-counter.component';

// =============== Helo Components ==========================
import { ConfirmComponent } from './modals/confirm/confirm.component';

// =============== Services ==========================
import { FlatService } from './services/flat.service';
import { CounterService } from './services/counter.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        FormsModule,
        HttpModule,
        BootstrapModalModule.forRoot({ container: document.body })
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
        AboutComponent,
        FlatComponent,
        NewFlatComponent, 
        CounterComponent,
        NewCounterComponent,
        ConfirmComponent
    ],
    entryComponents: [
        ConfirmComponent
    ],
    providers: [
        FlatService,
        CounterService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
