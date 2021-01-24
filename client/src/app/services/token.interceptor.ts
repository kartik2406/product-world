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
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('/'))
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getToken(),
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
