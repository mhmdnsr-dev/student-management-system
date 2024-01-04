import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, _) => {
  const auth = inject(AuthService);
  const authRoutes: string[] = ['login', 'register'];

  const authRoute = authRoutes.find(r => r === route.url[0]?.path);

  authRoute
    ? auth.value.isAuthenticated && auth.redirToHome()
    : !auth.value.isAuthenticated && auth.redirToLogin();

  return true;
};
