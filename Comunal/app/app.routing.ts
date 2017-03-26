import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { FlatComponent } from './components/flat/flat.component';
import { CounterComponent } from './components/counter/counter.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'myflats', component: FlatComponent },
    { path: 'counters', component: CounterComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}