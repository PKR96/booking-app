import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        const token = this.authService.getJwt();
        if (token && this.authService.isJWTValid(token)) {
            return true;
        }
        this.router.navigate(['/error']);
        return false;
    }
}