import { Component } from '@angular/core';
import { Ride } from '../../../models/ride.model';

@Component({
  selector: 'app-ratings-feedback',
  templateUrl: './ratings-feedback.component.html',
  styleUrl: './ratings-feedback.component.scss'
})
export class RatingsFeedbackComponent {
  rides: Ride[] = [
    {
      rideId: 'R001',
      driverId: 'D001',
      vehicle: {vehicleNo: 'V003', vehicleModel: ''},
      pickupLocation: 'New York',
      dropLocation: 'Boston',
      date: new Date(),
      pricePerPassenger: 20,
      totalSeats: 4,
      availableSeats: 2,
      rideStatus: 'COMPLETED',
      ratingsFeedback: [
        {
          riderId: 'RIDER001',
          ratings: 4.5,
          feedback: 'Great ride! The driver was punctual and polite.',
        },
        {
          riderId: 'RIDER002',
          ratings: 3.0,
          feedback: 'The ride was okay, but the car could have been cleaner.',
        },
      ],
    },
    {
      rideId: 'R002',
      driverId: 'D001',
      vehicle: {vehicleNo: 'V003', vehicleModel: ''},
      pickupLocation: 'New York',
      dropLocation: 'Boston',
      date: new Date(),
      pricePerPassenger: 20,
      totalSeats: 4,
      availableSeats: 2,
      rideStatus: 'COMPLETED',
      ratingsFeedback: [
        {
          riderId: 'RIDER003',
          ratings: 5.0,
          feedback: 'Excellent experience! Highly recommend.',
        },
      ],
    },
  ];

  // Save driver's response
  saveResponse(rideId: string, riderId: string, response: string) {
    const ride = this.rides.find((r) => r.rideId === rideId);
    if (ride) {
      const feedback = ride.ratingsFeedback ? ride.ratingsFeedback.find((rf) => rf.riderId === riderId) : "";
      if (feedback) {
        feedback.response = response; // Save response
      }
    }
  }
}
