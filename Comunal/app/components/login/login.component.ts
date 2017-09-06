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
    correctLoginPass: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit() {
        this.model = new User();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    login() {
        this.loading = true;
        this.correctLoginPass = true;
        this.authService.login(this.model.Email, this.model.Password)
            .subscribe(
            (data: User) => {
                if (!data.DataLastLogin) {
                    this.router.navigate(['/help']);
                } else {
                    this.router.navigate(['/myflats']);
                }
            },
            error => {
                console.log("FAILED");
                this.correctLoginPass = false;
            });
    }
}