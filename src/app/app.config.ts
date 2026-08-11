import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interseptors/auth.interceptor';
import { errorInterceptor } from './core/interseptors/error.interceptor';
import { loadingInterceptor } from './core/interseptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // withInterceptors tells Angular to run authInterceptor on every HTTP request
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor, errorInterceptor]))
  ]
};
