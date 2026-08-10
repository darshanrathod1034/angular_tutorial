import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { LoginCredentials, LoginResponse } from '../../../core/models/auth.model';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private router: Router) {
    console.log('login form', this.loginForm);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.getRawValue() as LoginCredentials).subscribe((res: LoginResponse) => {

        this.authService.setToken(res.token);

        this.authService.setCurrentUser(res.user);
        this.router.navigate(['/home']);
      });
    }
  }
} 
