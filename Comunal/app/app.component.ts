import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: `./app.component.html`,
})
export class AppComponent implements OnInit {
    showLoader: boolean;
    showLoaderFromHome: boolean;

    constructor(
        private loaderService: LoaderService,
        private router: Router,) {
    }

    ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            if (this.router.url == '/home' || this.router.url == '/') {
                this.showLoaderFromHome = val;
            } else {
                this.showLoader = val;
            }
        });
    }
}
