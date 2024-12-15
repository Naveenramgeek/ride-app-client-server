import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiderProfileResolverService {

  constructor(private authService: AuthService) {}
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      const userEmail = localStorage.getItem('userEmail');
      return this.authService.getRider(userEmail, 'RIDER').pipe(
        switchMap((rider) => {
          return this.authService.getUserById(rider.userId).pipe(
            map((user) => {
              return {
                rider: rider,
                user: user,
              };
            })
          );
        })
      );
    }
}
