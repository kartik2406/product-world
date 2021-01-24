import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('request.url', request.url);
    if (request.url.startsWith('/'))
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    return next.handle(request).pipe(
      catchError((errorObj: HttpErrorResponse) => {
        if (errorObj.status == 401) {
          this.router.navigateByUrl('/login');
        } else {
          let message = errorObj.error.error;
          this.toastr.error(message);
          console.log('Error', errorObj);
        }

        return throwError('test ms');
      })
    );
  }
}
