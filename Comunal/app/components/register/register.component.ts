import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
    moduleId: module.id,
    templateUrl: `register.component.html`,
})
export class RegisterComponent {
    model: any = {};
    loading: boolean = false;

    constructor(
        private router: Router,
        private userService: UserService
    ){}
    
    register() {
        this.loading = true;

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