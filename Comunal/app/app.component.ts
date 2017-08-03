import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `./app.component.html`,
})
export class AppComponent implements OnInit {
    showLoader: boolean;

    constructor(
        private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }
}
