import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedRoutes: string[] = ['/auth/signin', '/auth/signup'];
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const shouldExclude = this.excludedRoutes.some((route) => request.url.includes(route));

    if (shouldExclude) {
      // Pass the request without adding the Authorization header
      return next.handle(request);
    }
    
    const token = localStorage.getItem('authToken');
    if (token && this.tokenValidation(token)) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }

  tokenValidation(token: string){
    console.log(token)
    const helper = new JwtHelperService();
      return helper.isTokenExpired(token);
  }
}
