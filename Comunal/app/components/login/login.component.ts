import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: `login.component.html`,
})
export class LoginComponent implements OnInit  {
    model: User;
    loading: boolean = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit() {
        this.model = new User();
    }

    login() {
        this.loading = true;

        this.authService.CurrentUser = this.model;
        // authenticate via autentication service
    }
}