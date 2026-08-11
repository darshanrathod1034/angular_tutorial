// src/app/core/interceptors/loading.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs';
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.show();   // ← show spinner BEFORE request goes out
    return next(req).pipe(
        finalize(() => loadingService.hide())  // ← hide spinner AFTER response comes back
        //              ↑ finalize runs whether success OR error
    );
};  