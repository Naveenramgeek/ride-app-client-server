import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { User } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-bookings-page',
  templateUrl: './bookings-page.component.html',
  styleUrl: './bookings-page.component.scss'
})
export class BookingsPageComponent implements OnInit{
  
  bookings: any;

  users: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      //console.log(data['driverData'])
      this.bookings = data['bookingData'].bookings;
      this.users = data['bookingData'].users;
    });
  }

  // Categorize bookings by status
  get completedBookings(): Booking[] {
    return this.bookings.filter((b: { bookingStatus: string; }) => b.bookingStatus === 'COMPLETED');
  }

  get upcomingBookings(): Booking[] {
    return this.bookings.filter((b: { bookingStatus: string; }) => b.bookingStatus === 'UPCOMING');
  }

  // Fetch user details by riderId
  getUserById(riderId: string): User | undefined {
    return this.users.find((user: { userId: string; }) => user.userId === riderId);
  }
}
