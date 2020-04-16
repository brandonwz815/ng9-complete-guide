import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, 
                public router: Router) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            let authObj: Observable<AuthResponseData>;

            this.isLoading = true;
            if (this.isLoginMode) {
                authObj = this.authService.login(email, password);
            } else {
                authObj = this.authService.signup(email, password);
            }

            authObj.subscribe(resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.isLoading = false;
            });
            form.reset();
            return;
        }
        return;
    }

}