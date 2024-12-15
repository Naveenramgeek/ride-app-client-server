import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiderPaymentsResolverService {

  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userEmail = localStorage.getItem('userEmail');
    return this.authService.getRider(userEmail, 'RIDER').pipe(
      switchMap((rider) => {
        // Use rider ID from the first call to make the second call
        return this.authService.getPaymentsByRiderId(rider.userId).pipe(
          map((payments) => {
            const paymentsData = {
              rider: rider,
              payments: payments,
            };
            return paymentsData; // Return the complete payments object
          })
        );
      })
    );
  }
}
