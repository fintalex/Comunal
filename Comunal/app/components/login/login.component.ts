import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: `login.component.html`,
})
export class LoginComponent implements OnInit  {
    model: User = new User();
    loading: boolean = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit() {

    }

    login() {
        this.loading = true;
        // authenticate via autentication service
    }
}