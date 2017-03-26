import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: `./navbar.component.html`,
})
export class NavbarComponent {
    website = 'Navbar Component';

    constructor(
        private router: Router,
        private route: ActivatedRoute) {

    }
}
