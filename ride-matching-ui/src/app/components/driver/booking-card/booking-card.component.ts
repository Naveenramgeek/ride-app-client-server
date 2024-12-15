import { Component, Input } from '@angular/core';
import { Booking } from '../../../models/booking.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss'
})
export class BookingCardComponent {
  @Input() booking!: Booking; // Booking details
  @Input() rider!: User | undefined; // Rider details fetched by riderId
}
