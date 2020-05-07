import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
// import { FormatInputPathObject } from 'path';
import * as AuthActions from './store/auth.actions';
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    private closeSub: Subscription;

    constructor(private authService: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;
            // let authObj: Observable<AuthResponseData>;

            this.isLoading = true;
            if (this.isLoginMode) {
                // authObj = this.authService.login(email, password);
                this.store.dispatch(
                    new AuthActions.LoginStart({ email, password })
                );
            } else {
                // authObj = this.authService.signup(email, password);
                this.store.dispatch(
                    new AuthActions.SignupStart({ email: email, password: password })
                );
            }


            // authObj.subscribe(resData => {
            //     console.log(resData);
            //     this.isLoading = false;
            //     this.router.navigate(['/recipes']);
            // }, errorMessage => {
            //     console.log(errorMessage);
            //     this.error = errorMessage;
            //     this.showErrorAlert(errorMessage);
            //     this.isLoading = false;

            // });
            form.reset();
            return;
        }
        return;
    }

    onHandleError() {
        this.error = null;
    }

    ngOnInit() {
        this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if (this.error) {
                this.showErrorAlert(this.error);
            }
        });
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        // const alertComponent = new AlertComponent();
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

}