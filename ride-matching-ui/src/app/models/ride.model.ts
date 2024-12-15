export interface Ride {
  rideId: string;
  driverId: string;
  vehicle: { vehicleNo: string; vehicleModel: string };
  pickupLocation: string;
  dropLocation: string;
  date: Date;
  estimatedDate?: Date;
  pricePerPassenger: number;
  totalSeats: number;
  availableSeats: number;
  rideStatus: string; // e.g., "COMPLETED", "UPCOMING", "CANCELLED"
  ratingsFeedback?: RatingsFeedback[];
}

export interface RatingsFeedback {
  riderId: string;
  ratings: number;
  feedback: string;
  response?: string; // Optional driver response
}