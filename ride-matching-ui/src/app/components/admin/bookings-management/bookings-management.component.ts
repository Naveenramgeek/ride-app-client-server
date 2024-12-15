import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Ride } from '../../../models/ride.model';

@Component({
  selector: 'app-bookings-management',
  templateUrl: './bookings-management.component.html',
  styleUrl: './bookings-management.component.scss'
})
export class BookingsManagementComponent implements OnInit {

  bookings!: Booking[];
  rides: any;

  constructor(private authService: AuthService, private route: ActivatedRoute){}

 ngOnInit(): void {
   this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.bookings = data['bookings'];
      this.rides = data['rides'];
    });
 }
 
 getRideDetails(rideId: string): Ride | null {
     return this.rides.find((ride: { rideId: string; }) => ride.rideId === rideId) || null;
   }

 cancelBooking(bookingId: string): void {
  const booking = this.bookings.find((b) => b.bookingId === bookingId);
  if (booking) {
    booking.bookingStatus = 'ADMIN_CANCELLED';
    this.authService.cancelBookig(booking).subscribe({
      next: (response) => {
        console.log('Booking updated successful:', response);
      },
      error: (err) =>{
        console.error('Ride  posting unsuccesful:', err);
      }
    })
  }
}

get upcomingBookings(): Booking[] {
  return this.bookings.filter((b) => b.bookingStatus === 'UPCOMING');
}

get completedBookings(): Booking[] {
  return this.bookings.filter((b) => b.bookingStatus === 'COMPLETED');
}

get driverCancelledBookings(): Booking[] {
  return this.bookings.filter((b) => b.bookingStatus === 'DRIVER_CANCELLED');
}

get riderCancelledBookings(): Booking[] {
  return this.bookings.filter((b) => b.bookingStatus === 'RIDER_CANCELLED');
}

}
