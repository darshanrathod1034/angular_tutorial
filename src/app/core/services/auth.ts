import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginCredentials, LoginResponse } from '../models/auth.model';
import { Observable } from 'rxjs';
import { signal } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    currentUser = signal<User | null>(null);
    login(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${environment.apiUrl}/users/login`,
            credentials
        );
    }

    setToken(token: string) {

        localStorage.setItem('token', token);

    }
    getToken() {

        return localStorage.getItem('token');

    }
    logout() {

        localStorage.removeItem('token');

    }
    setCurrentUser(user: User) {

        this.currentUser.set(user);

    }
    loadCurrentUser(userId: string) {

        return this.http.get<User>(
            `${environment.apiUrl}/users/${userId}`
        );

    }
    getUserIdFromToken(): string | null {

        const token = this.getToken();

        if (!token) {
            return null;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));

        return payload.id;

    }

    isLoggedIn(): boolean {

        return !!this.getToken();

    }
}       