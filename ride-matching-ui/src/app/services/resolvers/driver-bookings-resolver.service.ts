import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverBookingsResolverService {

  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('rideId');
    return this.authService.getBookingsByRideId(id).pipe(
      switchMap((bookings) => {
        const rideIds = bookings.map((data: { riderId: any; }) => {return data.riderId})
        // if (!bookings || bookings.length === 0) {
        //   // Redirect to a specific URL
        //   this.router.navigate(['/driver/rides']);
        //   return [];
        // } else {
          
        // }
        return this.authService.getUsersByIds(rideIds).pipe(
          map((users) => {
            const driverData = {
              bookings: bookings,
              users: users,
            };
            return driverData; // Return the complete driverData object
          })
        );
      })
    );
  }
}
