import { Component } from '@angular/core';
import { RatingsFeedback, Ride } from '../../../models/ride.model';
import { Booking } from '../../../models/booking.model';
import { Driver } from '../../../models/driver.model';

@Component({
  selector: 'app-feedback-rating',
  templateUrl: './feedback-rating.component.html',
  styleUrl: './feedback-rating.component.scss'
})
export class FeedbackRatingComponent {

  drivers = [
    {
      userId: 'D001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: 1234567890,
      address: '123 Main Street',
      role: 'Driver',
      balance: 100.0,
      licenseInfo: 'Valid',
      ratings: 4.5,
      vehicles: [{ vehicleNo: 'V001', vehicleModel: 'Sedan' }],
    },
    {
      userId: 'D002',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: 9876543210,
      address: '456 Elm Street',
      role: 'Driver',
      balance: 200.0,
      licenseInfo: 'Valid',
      ratings: 4.7,
      vehicles: [{ vehicleNo: 'V002', vehicleModel: 'SUV' }],
    },
  ];
  
  bookings: Booking[] = [
    {
      bookingId: 'A1B2C3D',
      rideId: 'R001',
      riderId: '',
      seatsBooked: 2,
      passengers: [
        { name: 'Alice', gender: 'M', age: 25 },
        { name: 'Bob', gender: 'M', age: 30 },
      ],
      totalPrice: 40,
      bookingStatus: 'UPCOMING',
    },
    {
      bookingId: 'E4F5G6H',
      rideId: 'R002',
      riderId: '',
      seatsBooked: 1,
      passengers: [{ name: 'Charlie', gender: 'M', age: 35 }],
      totalPrice: 25,
      bookingStatus: 'COMPLETED',
    },
    {
      bookingId: 'I7J8K9L',
      rideId: 'R003',
      riderId: '',
      seatsBooked: 1,
      passengers: [{ name: 'David', gender: 'M', age: 28 }],
      totalPrice: 20,
      bookingStatus: 'DRIVER_CANCELLED',
    },
    {
      bookingId: 'M0N1O2P',
      rideId: 'R004',
      riderId: '',
      seatsBooked: 3,
      passengers: [
        { name: 'Eve', gender: 'M', age: 27 },
        { name: 'Frank', gender: 'M', age: 32 },
        { name: 'Grace', gender: 'M', age: 29 },
      ],
      totalPrice: 60,
      bookingStatus: 'RIDER_CANCELLED',
    },
  ];

  rides: Ride[] = [
    {
      rideId: 'R001',
      driverId: 'D001',
      vehicle: {vehicleNo: 'V003', vehicleModel: ''},
      pickupLocation: 'Downtown',
      dropLocation: 'Airport',
      date: new Date('2024-11-28T10:30:00'),
      pricePerPassenger: 20,
      totalSeats: 4,
      availableSeats: 2,
      rideStatus: 'COMPLETED',
      ratingsFeedback: [
        { riderId: 'RIDER001', ratings: 4, feedback: 'Great ride!', response: undefined },
      ],
    },
    {
      rideId: 'R002',
      driverId: 'D002',
      vehicle: {vehicleNo: 'V003', vehicleModel: ''},
      pickupLocation: 'City Center',
      dropLocation: 'Train Station',
      date: new Date('2024-11-25T12:00:00'),
      pricePerPassenger: 25,
      totalSeats: 3,
      availableSeats: 0,
      rideStatus: 'COMPLETED',
      ratingsFeedback: [],
    },
  ];

  completedRides: (Ride & { riderId: string; driverName: string })[] = [];
  selectedRide: Ride & { riderId: string; driverName: string } | null = null;

  ngOnInit(): void {
    this.fetchCompletedRides();
  }

  // Fetch completed rides with driver names
  fetchCompletedRides(): void {
    this.completedRides = this.bookings
      .filter((booking) => booking.bookingStatus === 'COMPLETED')
      .map((booking) => {
        const ride = this.rides.find((r) => r.rideId === booking.rideId);
        const driver = ride ? this.drivers.find((d) => d.userId === ride.driverId) : null;

        return ride && driver
          ? {
              ...ride,
              riderId: booking.riderId,
              driverName: driver.firstName + ' ' + driver.lastName,
            }
          : null;
      })
      .filter((ride) => ride !== null) as (Ride & { riderId: string; driverName: string })[];
  }

  // Check if feedback exists for the rider
  hasFeedback(ride: Ride & { riderId: string }): boolean {
    return ride.ratingsFeedback ? ride.ratingsFeedback.some((feedback) => feedback.riderId === ride.riderId) : false;
  }

  // Get feedback for the rider
  getFeedback(ride: Ride & { riderId: string }): RatingsFeedback | null {
    return ride.ratingsFeedback ? ride.ratingsFeedback.find((feedback) => feedback.riderId === ride.riderId) || null : null;
  }

  // Open feedback modal
  leaveFeedback(ride: Ride & { riderId: string; driverName: string }): void {
    this.selectedRide = ride;
  }

  closeFeedbackModal(): void {
    this.selectedRide = null;
  }
  
  // Save feedback
  saveFeedback(ratingInput: string, feedback: string): void {
    const rating = parseFloat(ratingInput);
  
    // Check if the rating is valid
    if (isNaN(rating) || rating < 0 || rating > 5) {
      alert('Please enter a valid rating between 0 and 5.');
      return;
    }
  
    if (this.selectedRide) {
      const rideIndex = this.rides.findIndex((r) => r.rideId === this.selectedRide!.rideId);
      if (rideIndex !== -1) {
        if(this.rides[rideIndex].ratingsFeedback){
          this.rides[rideIndex].ratingsFeedback.push({
            riderId: this.selectedRide!.riderId,
            ratings: rating,
            feedback,
            response: undefined,
          });
        }
      }
    }
    this.selectedRide = null;
    this.fetchCompletedRides(); // Refresh completed rides
  }
}
