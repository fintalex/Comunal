import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: `./navbar.component.html`,
})
export class NavbarComponent implements OnInit {
    //currentUser: User;
    //https://material.io/icons/
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService)
    { }

    ngOnInit() {
        //this.currentUser = this.authService.CurrentUser;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
