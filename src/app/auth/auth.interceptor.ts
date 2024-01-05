import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let {
    value: { token },
  } = inject(AuthService);

  const authReq = req.clone({
    setHeaders: { ...(token && { token }), lang: 'en' },
  });

  console.log(authReq.headers.keys());

  console.log('interceptor run', req);

  return next(authReq);
};
