import { Component, Input } from '@angular/core';
import { Ride } from '../../../models/ride.model';
import { Driver } from '../../../models/driver.model';
import { Vehicle } from '../../../models/vehicle.model';
import { ActivatedRoute } from '@angular/router';
import { Booking } from '../../../models/booking.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrl: './ride-details.component.scss'
})
export class RideDetailsComponent {

  ride: Ride | null = null;
  driver: any = null;
  vehicle: Vehicle | null = null;
  showBookingForm = false;
  rider: any;
  bookings!: Booking[];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const rideId = this.route.snapshot.paramMap.get('rideId');
    const state = history.state;

    this.ride = state.ride;
    this.driver = state.driver;
    console.log("vehicleId" , state.ride)
    if(this.ride){
      this.authService.getVehicleById(this.ride.vehicle.vehicleNo).subscribe({
        next: (response) => {
          this.vehicle = response;
        },
        error: (err) => {
          console.error('Login error:', err);
        },
      });
    }
    
    console.log(this.ride, this.driver)

    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.rider = data['riderData'].rider; // Access resolved data
      this.bookings = data['riderData'].bookings;
    });

    // if (!state.ride || !state.driverId || !state.vehicleNo) {
    //   console.error('Missing required state data. Redirecting to previous page...');
    //   // Redirect or show error
    //   window.history.back();
    //   return;
    // }

    // this.vehicle = this.getVehicle(state.vehicleNo);

    // if (!this.ride || !this.driver || !this.vehicle) {
    //   console.error('Error fetching details. Ensure data is consistent.');
    // }
  }

  // getDriver(driverId: string) {
  //   return this.drivers.find((d) => d.userId === driverId) || null;
  // }

  // getVehicle(vehicleNo: string): Vehicle | null {
  //   return this.vehicles.find((v) => v.vehicleNo === vehicleNo) || null;
  // }

  bookRide(): void {
    this.showBookingForm = true;
  }
  
  handleSaveBooking(booking: any): void {
    console.log('Booking Saved:', booking);
    // Handle booking data (e.g., send to API or update state)
  }
}
