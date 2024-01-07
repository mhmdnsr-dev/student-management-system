import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let {
    value: { token },
  } = inject(AuthService);

  const authReq = req.clone({
    setHeaders: { ...(token && { token }), lang: 'en' },
  });

  return next(authReq);
};
