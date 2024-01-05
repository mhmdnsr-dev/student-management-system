import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private AUTH = new BehaviorSubject<Auth>(
    JSON.parse(localStorage.getItem('auth')!) || {
      isAuthenticated: false,
    }
  );

  constructor(private router: Router) {}

  get value() {
    return this.AUTH.value;
  }

  get subscribe() {
    return this.AUTH.subscribe.bind(this.AUTH);
  }

  login(token: string) {
    const auth = {
      isAuthenticated: true,
      token,
    };

    this.AUTH.next(auth);
    localStorage.setItem('auth', JSON.stringify(auth));
    this.redirToHome();
  }

  logout() {
    this.AUTH.next({
      isAuthenticated: false,
    });
    localStorage.removeItem('auth');
    this.redirToLogin();
  }

  redirToHome() {
    this.router.navigate(['home']);
  }

  redirToLogin() {
    this.router.navigate(['login']);
  }
}
