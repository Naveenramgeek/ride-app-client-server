import { Component, OnInit } from '@angular/core';
import { Ride } from '../../../models/ride.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from '../../../models/driver.model';
import { AuthService } from '../../../services/auth.service';
import moment from 'moment';
import { map, switchMap } from 'rxjs';
import { Booking } from '../../../models/booking.model';

@Component({
  selector: 'app-rides-page',
  templateUrl: './rides-page.component.html',
  styleUrl: './rides-page.component.scss'
})
export class RidesPageComponent implements OnInit {

  driver!: Driver;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.driver = data['driverData'].driver; // Access resolved data
      this.rides = data['driverData'].rides;
      this.updateRides();
      console.log(this.rides = data['driverData'].rides)
    });
  }

  rides: Ride[] = [];
  todayRides: Ride[] = [];
  upcomingRides: Ride[] = [];
  completedRides: Ride[] = [];
  cancelledRides: Ride[] = [];
  showForm = false; // Toggle for Add/Edit Form
  currentRide: Ride | null = null; // Ride being edited

  getTodayRides() {
    const today = new Date();
    this.todayRides = this.rides.filter(
      (ride) =>
        moment(ride.date).local().isSame(moment(), 'day') &&
        ride.rideStatus === 'UPCOMING'
    );
  }
  
  convertToLocalTimezone(dateString: any): string {
    // Parse the date string and convert to local timezone
    const localDate = moment(dateString).local();
    return localDate.format('YYYY-MM-DD hh:mm A'); // Format with AM/PM
  }

  updateRides(){
    this.getTodayRides();
    this.getCompletedRides();
    this.getUpcomingRides();
    this.getCancelledRides();
  }
  getUpcomingRides(){
    const today = new Date();
    this.upcomingRides = this.rides.filter((ride) => moment(ride.date).local().isAfter(moment(), 'day') && ride.rideStatus === 'UPCOMING');
  }

  getCompletedRides(){
    this.completedRides = this.rides.filter((ride) => ride.rideStatus === 'COMPLETED');
  }

  getCancelledRides(){
    this.cancelledRides = this.rides.filter((ride) => ride.rideStatus === 'DRIVER_CANCELLED' || ride.rideStatus === 'ADMIN_CANCELLED');
  }
  
  openAddForm() {
    this.currentRide = null; // Set to null for adding
    this.showForm = true;
  }

  openEditForm(ride: Ride) {
    this.currentRide = ride; // Pass the ride to the form
    this.showForm = true;
  }

  completeRide(ride: Ride){
    let bookings: Booking[];

    //get bookings to complete
    this.authService.getBookingsByRideId(ride.rideId).subscribe({
      next: (response: Booking[]) => {
        bookings = response.map(booking => {booking.bookingStatus = "COMPLETED"; return booking})
        console.log(bookings)

        //Post updated ride
        ride.rideStatus = "COMPLETED"
        this.authService.postRide(ride).subscribe({
          next: (response) => {
            console.log("Ride completed successfully")
          },
          error: (err) =>{
            console.error('Ride  completion unsuccesful:', err);
          }
        })

        //Complete the bookings
        this.authService.saveMultipleBookings(bookings).subscribe({
          next: (response) => {
            console.log("Bookings cancelled successfully successfully")
            this.authService.completePayments(bookings).subscribe({
              next: (response) => {
                console.log("payments completed successfully")
    
                
              },
              error: (err) =>{
                console.error('Ride  posting unsuccesful:', err);
              }
            })


          },
          error: (err) =>{
            console.error('Ride  posting unsuccesful:', err);
          }
        })

      },
      error: (err) =>{
        console.error('Ride  posting unsuccesful:', err);
      }
    })
  }

  timePassed(date: any){
    return moment(date).local().isAfter(moment());
  }

  addNewRide(){
    this.currentRide = null;
    this.showForm = true;
  }
  saveRide(ride: Ride) {
    if (this.currentRide) {
      console.log(ride)
      // Edit existing ride
      const index = this.rides.findIndex((r) => r.rideId === ride.rideId);
      if (index !== -1) {
        this.rides[index] = ride;
        this.authService.updateRide(ride).subscribe({
          next: (response) => {
            this.updateRides();
            console.log('Ride updated successful:', response);
            this.closeForm();
          },
          error: (err) =>{
            console.error('Ride  updating unsuccesful:', err);
          }
        })
      }
    } else {
      // Add new ride
      console.log(ride)
      ride.rideId = this.generateRandomHexCode();
      ride.driverId = this.driver.userId;
      this.authService.postRide(ride).subscribe({
        next: (response) => {

          this.rides = [...this.rides, ride]
          this.updateRides();
          console.log('Ride posted successful:', response);
          this.closeForm();
        },
        error: (err) =>{
          console.error('Ride  posting unsuccesful:', err);
        }
      })
    }
  }

  generateRandomHexCode(): string {
    const letters = '0123456789ABCDEF';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += letters[Math.floor(Math.random() * 16)];
    }
    return code;
  }

  closeForm() {
    this.showForm = false;
    this.currentRide = null;
  }

  deleteRide(ride: Ride){
    let bookings: Booking[];

    //get bookings to cancel
    this.authService.getBookingsByRideId(ride.rideId).subscribe({
      next: (response: Booking[]) => {
        bookings = response.map(booking => {booking.bookingStatus = "DRIVER_CANCELLED"; return booking})
        console.log(bookings)
        
        //Post updated ride
        ride.rideStatus = "CANCELLED"
        this.authService.postRide(ride).subscribe({
          next: (response) => {
            console.log("RideCancelled successfully")
          },
          error: (err) =>{
            console.error('Ride  posting unsuccesful:', err);
          }
        })

        //Cancel the bookings
        this.authService.saveMultipleBookings(bookings).subscribe({
          next: (response) => {
            console.log("Bookings cancelled successfully successfully")
          },
          error: (err) =>{
            console.error('Ride  posting unsuccesful:', err);
          }
        })

      },
      error: (err) =>{
        console.error('Ride  posting unsuccesful:', err);
      }
    })
  }
}
