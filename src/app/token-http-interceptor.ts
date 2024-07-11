import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';

export const tokenHttpInterceptor: HttpInterceptorFn =(req,next)=>{
    if (typeof localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      }
      return next(req);
}