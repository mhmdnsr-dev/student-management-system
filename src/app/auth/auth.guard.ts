import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, _) => {
  const authServise = inject(AuthService);
  const authRoutes: string[] = ['login', 'register'];

  const authRoute = authRoutes.find(r => r === route.url[0]?.path);

  authRoute
    ? authServise.value.isAuthenticated && authServise.redirToHome()
    : !authServise.value.isAuthenticated && authServise.redirToLogin();

  return true;
};
