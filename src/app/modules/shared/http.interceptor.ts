import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor(public authService:AuthService,public router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let AuthRequest = req;
    if(this.authService.loggedIn) 
    {
      const token =  this.authService.getToken();
    // if the token is  stored in localstorage add it to http header
    const headers = req.headers.set("Authorization","Bearer "+ token);

      //clone http to the custom AuthRequest and send it to the server 
    AuthRequest = req.clone( { headers: headers});
    }
    return next.handle(AuthRequest).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          console.log('status = ', evt.status);
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          console.error('error status = ', error.status);
          // console.log('---> filter:', req.params.get('filter'));
          if (
            error.status == 401 ) {
              this.authService.logout();
              this.router.navigate(['/login']);
            // redirect to error page
            // OR you can use a toast
                      
          }
        }
        return throwError(error);
      })
    );

  }
}