import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root', // Ensure it's provided at the root level
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const helper = new JwtHelperService();
      let routeRole = route.data['role'];
      let loginRole = localStorage.getItem('userRole');
      return routeRole === loginRole && !helper.isTokenExpired(token);
    }
    this.router.navigate(['/login']); // Redirect to login if not authenticated
    console.log("succefailss")
    return false;
  }
}
