import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverEarningsResolverService {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.authService.getDriver(userEmail, 'DRIVER').pipe(
      switchMap((driver) => {
        // Use rider ID from the first call to make the second call
        return this.authService.getPaymentsByDriverId(driver.userId).pipe(
          map((payments) => {
            const paymentsData = {
              driver: driver,
              payments: payments,
            };
            return paymentsData; // Return the complete payments object
          })
        );
      })
    );
  }
}
