import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // console.log(token);
    if (token){
      const newReq = req.clone({
        headers: req.headers.append('Authorization', `JWT ${token}`)
      });
      return next.handle(newReq);
    }
    return next.handle(req);
  }
}
