import { Injectable,inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn(): boolean {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('token') != null) {
            return true;
        } else {
            return false;
        }
    }
    toastr=inject(ToastrService);
    login(token: string): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    logout(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('token');
            this.toastr.success("user Logout Successfully");
        }
    }
}
