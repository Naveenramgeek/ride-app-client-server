export interface Passenger {
    name: string;
    age: number | null;
    gender: string;
  }
  
  export interface Booking {
    bookingId: string;
    riderId: string;
    rideId: string;
    seatsBooked: number;
    passengers: Passenger[];
    totalPrice: number;
    bookingStatus: string; // "COMPLETED", "UPCOMING", "DRIVER_CANCELED", "RIDER_CANCELED"
  }
  