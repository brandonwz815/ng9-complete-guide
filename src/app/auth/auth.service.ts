import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string, 
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD37Wkrho6eCeL4iHive1yYi7jXBZGsu38',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'An unknown error occurred';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email already exists'
                    return throwError(errorMessage)
            }
            return;
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD37Wkrho6eCeL4iHive1yYi7jXBZGsu38',
            {
                email,
                password,
                returnSecureToken: true
            }

        )
    }
}