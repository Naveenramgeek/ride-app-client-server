export interface Payment {
    paymentId: string;
    rideId: string;
    riderId: string;
    driverId: string;
    bookingId: string;
    driverShare: number;
    adminShare: number;
    payableAmount: number;
    paymentMethod: string;
    paymentStatus: string; // "COMPLETED", "PENDING"
    paymentDate: Date;
  }