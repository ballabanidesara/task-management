import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize, catchError, map } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, body } = req;

    return of(null).pipe(
      mergeMap(() => {
        // Simulate API call for user registration
        if (url.endsWith('/api/auth/signup') && method === 'POST') {
          const { email, password } = body;
          if (email && password) {
            const token = `mock-jwt-token-for-${email}`;
            return of(new HttpResponse({ status: 200, body: { token } }));
          } else {
            return throwError(() => new HttpResponse({ status: 400, body: { message: 'Email and password are required' } }));
          }
        }

        // Simulate API call for user login
        if (url.endsWith('/api/auth/login') && method === 'POST') {
          const { email, password } = body;
          if (email && password) {
            const token = `mock-jwt-token-for-${email}`;
            return of(new HttpResponse({ status: 200, body: { token } }));
          } else {
            return throwError(() => new HttpResponse({ status: 400, body: { message: 'Email and password are required' } }));
          }
        }

        return next.handle(req);
      }),
      materialize(),
      delay(500),
      dematerialize()
    );
  }
}
