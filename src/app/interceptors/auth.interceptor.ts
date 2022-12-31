import { LocalStorageService } from '../services/local-storage.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public localStorage: LocalStorageService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const jwt = this.localStorage.getJwt();
    if (jwt) {
      request = request.clone({
        setHeaders: {
          Authorization: jwt,
        },
      });
    }
    return next.handle(request);
  }
}
