import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid -> force logout and redirect to login
        auth.logout();
        router.navigate(['/login']);
      }

      if (error.status === 500) {
        console.error('Something went wrong on the server:', error);
      }

      return throwError(() => error);
    })
  );
};
