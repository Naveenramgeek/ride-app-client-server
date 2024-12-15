import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { Ride } from '../../../models/ride.model';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit  {
  rides: any;
  bookings!: Booking[];

  selectedBooking: Booking | null = null;
  selectedRide: Ride | null = null;
  showEditOverlay = false;
  ride!: any;

  constructor(private authService: AuthService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.bookings = data['riderData'].bookings;
    });
    const rideIds = this.bookings.map(data => {return data.rideId})
    this.authService.getRidesByRideIds(rideIds).subscribe({
      next: (response) => {
        this.rides = response;
      },
      error: (err) => {
        this.ride = null;
        console.error('Login error:', err);
      },
    })
  }

  getRideDetails(rideId: string): Ride | null {
    return this.rides.find((ride: { rideId: string; }) => ride.rideId === rideId) || null;
  }

  editBooking(booking: Booking): void {
    this.selectedBooking = { ...booking };
    this.selectedRide = this.getRideDetails(booking.rideId);
    this.showEditOverlay = true;
  }

  cancelBooking(bookingId: string): void {
    const booking = this.bookings.find((b) => b.bookingId === bookingId);
    if (booking) {
      booking.bookingStatus = 'RIDER_CANCELLED';
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

  saveEditedBooking(updatedBooking: Booking): void {
    const index = this.bookings.findIndex((b) => b.bookingId === updatedBooking.bookingId);
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
    }
    this.showEditOverlay = false;
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
