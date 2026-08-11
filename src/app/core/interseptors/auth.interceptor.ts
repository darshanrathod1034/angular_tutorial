import { HttpInterceptorFn } from '@angular/common/http';

// This function runs automatically before EVERY HTTP request your app makes.
// It reads the token from localStorage and attaches it to the request header.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // If no token found, just send the request as-is (e.g. login request)
  if (!token) {
    return next(req);
  }

  // Clone the request and add the Authorization header
  // We "clone" because HTTP requests are immutable (cannot be changed directly)
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Pass the modified request forward
  return next(authReq);
};
