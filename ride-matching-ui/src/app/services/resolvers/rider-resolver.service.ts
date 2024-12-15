import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiderResolverService {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.authService.getRider(userEmail, 'RIDER').pipe(
      switchMap((rider) => {
        // Use driver ID from the first call to make the second call
        return this.authService.getBookingsByRiderId(rider.userId).pipe(
          map((bookings) => {
            const riderData = {
              rider: rider,
              bookings: bookings,
            };
            return riderData; // Return the complete driverData object
          })
        );
      })
    );
  }
}
