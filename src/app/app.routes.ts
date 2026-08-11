import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.Home),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile/profile').then(m => m.Profile),
        canActivate: [authGuard]
    },
    {
        path: 'explore',
        loadComponent: () => import('./features/explore/explore').then(m => m.Explore),
        canActivate: [authGuard]
    }
];

