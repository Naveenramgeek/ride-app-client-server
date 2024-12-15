import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class DriverProfileResolver implements Resolve<any> {
  constructor(private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userEmail = localStorage.getItem('userEmail'); // Get user email from localStorage

    return this.authService.getDriver(userEmail, 'DRIVER').pipe(
      switchMap((driver) => {
        return this.authService.getUserById(driver.userId).pipe(
          switchMap((user) => {
            const vehicleNos = driver.vehicles.map((v: any) => v.vehicleNo); // Extract vehicle numbers

            // Fetch all vehicles based on the vehicle numbers
            return this.authService.getVehiclesByNumber(vehicleNos).pipe(
              map((vehicles) => {
                // Combine the user, driver, and vehicles data into one object
                return {
                  user: user,
                  driver: driver,
                  vehicles: vehicles,
                };
              })
            );
          })
        );
      })
    );
  }
}
