import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Booking, Passenger } from '../../../models/booking.model';
import { AuthService } from '../../../services/auth.service';
import { Payment } from '../../../models/payments.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.scss'
})
export class BookingFormComponent implements OnChanges {
  @Input() ride: any; // The ride details
  @Input() booking: any; // The booking details
  @Input() riderId!: string;
  @Input() driverId!: string;
  @Input() payment!: Payment;
  @Output() closeForm = new EventEmitter<void>();
  @Output() saveBooking = new EventEmitter<any>();
  


  bookingId: string = this.generateHexId();
  selectedSeats: number | null = null;
  availableSeats: number = 0;
  bookingSeats: number = 0;
  passengers: Passenger[] = [];
  bookingDetails = {};

  constructor(private authService: AuthService){}
  
  ngOnChanges(changes: SimpleChanges): void {
    this.availableSeats = this.ride.availableSeats || 0;
    this.bookingSeats = this.booking.seatsBooked || 0;
    if(this.booking){
      this.bookingId = this.booking.bookingId;
      this.passengers = this.booking.passengers;
    }
    console.log(this.booking);
  }

  generateHexId(): string {
    return Math.floor(Math.random() * 0xffffff7).toString(16).padStart(7, '0');
  }

  onSeatsChange(event: any): void {
    const seats = parseInt(event.target.value, 10);
    this.selectedSeats = seats;
    let noOfPassengers = seats;
    this.passengers = []; // Reset passengers list when seat count changes
    while(noOfPassengers > 0){
      this.passengers.push({ name: '', age: null, gender: '' });
      noOfPassengers = noOfPassengers - 1;
    }
  }

  addPassenger(): void {
    if (this.passengers.length < (this.selectedSeats || 0)) {
      this.passengers.push({ name: '', age: null, gender: '' });
    }
  }

  save(): void {
    if (this.passengers.length !== this.selectedSeats) {
      console.log(this.booking)
      alert('Please add all passengers before saving.');
      return;
    }
    if(!this.booking){
      this.booking = {
        bookingId: this.bookingId,
        rideId: this.ride.rideId,
        riderId: this.riderId,
        seatsBooked: this.selectedSeats,
        passengers: this.passengers,
        totalPrice: this.selectedSeats > 0 && this.ride?.pricePerPassenger
        ? this.selectedSeats * this.ride.pricePerPassenger
        : 0,
        bookingStatus: 'UPCOMING',
      };

      let adminShare = this.booking.totalPrice * 0.15;
      let driverShare = this.booking.totalPrice - adminShare;
      this.payment = {
        paymentId: this.generateHexId(),
        rideId: this.ride.rideId,
        riderId: this.riderId,
        driverId: this.driverId,
        bookingId: this.bookingId,
        driverShare: driverShare,
        adminShare: adminShare,
        payableAmount: this.booking.totalPrice,
        paymentMethod: "Card",
        paymentStatus: "PENDING",
        paymentDate: new Date()
      }

      console.log(this.payment);
      this.authService.postBookig(this.booking).subscribe({
        next: (response) => {
          console.log('Booking posted successful:', response);

          //create Payments
          this.authService.createPayments(this.payment).subscribe({
            next: (payment) => {

              console.log('Payment creation successful:', payment);
    
            },
            error: (err) =>{
              console.error('payment  creation unsuccesful:', err);
            }
          })

        },
        error: (err) =>{
          console.error('Ride  posting unsuccesful:', err);
        }
      })
      
    } else {
      this.booking = {
        bookingId: this.booking.bookingId,
        rideId: this.booking.rideId,
        riderId: this.booking.riderId,
        seatsBooked: this.selectedSeats,
        passengers: this.passengers,
        totalPrice: this.selectedSeats > 0 && this.ride?.pricePerPassenger
        ? this.selectedSeats * this.ride.pricePerPassenger
        : 0,
        bookingStatus: 'UPCOMING',
      };

      const adminShare = this.booking.totalPrice * 0.15;
      const driverShare = this.booking.totalPrice - adminShare;
      this.payment = {
        paymentId: this.generateHexId(),
        rideId: this.ride.rideId,
        riderId: this.booking.riderId,
        driverId: this.ride.driverId,
        bookingId: this.booking.bookingId,
        driverShare: driverShare,
        adminShare: adminShare,
        payableAmount: this.booking.totalPrice,
        paymentMethod: "Card",
        paymentStatus: "PENDING",
        paymentDate: new Date()
      }

      this.authService.UpdateBookig(this.booking).subscribe({
        next: (response) => {
          console.log('Booking updated successful:', response);

          //update Payments
          this.authService.updatePayments(this.payment).subscribe({
            next: (payment) => {

              console.log('Payment updation successful:', payment);
    
            },
            error: (err) =>{
              console.error('payment  updation unsuccesful:', err);
            }
          })
        },
        error: (err) =>{
          console.error('Ride  posting unsuccesful:', err);
        }
      })
      console.log(this.booking);
    }
    
    this.saveBooking.emit(this.bookingDetails);
    this.closeForm.emit(); // Close the overlay
  }
}
