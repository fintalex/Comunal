import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/user';

@Component({
    moduleId: module.id,
    templateUrl: `register.component.html`,
})
export class RegisterComponent {
    model: User = new User();
    loading: boolean = false;
    emailExist: boolean = false;
    emailChecking: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService
    ){}
    
    register() {
        this.loading = true;

        if (!this.emailChecking) {
            this.userService.createUser(this.model)
                .subscribe(
                user => {
                    // here must be some alert about 'Registration successful'
                    this.router.navigate(['/login']);
                },
                error => {
                    // here must be some alert about 'FAILED'
                    this.loading = false;
                });
        }
    }

    checkEmail() {
        this.emailChecking = true;
        return this.userService.isEmailAlreadyExist(this.model)
            .subscribe(res => {
                console.log(res);
                this.emailExist = res.Result;
                this.emailChecking = false;
            });
    }
}