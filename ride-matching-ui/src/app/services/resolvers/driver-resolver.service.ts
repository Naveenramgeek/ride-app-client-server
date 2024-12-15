import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverResolverService implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.authService.getDriver(userEmail, 'DRIVER').pipe(
      switchMap((driver) => {
        // Use driver ID from the first call to make the second call
        return this.authService.getRidesByDriverId(driver.userId).pipe(
          map((rides) => {
            const driverData = {
              driver: driver,
              rides: rides,
            };
            return driverData; // Return the complete driverData object
          })
        );
      })
    );
  }
}
