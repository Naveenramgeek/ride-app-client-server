import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Ride } from '../../../models/ride.model';
import { AuthService } from '../../../services/auth.service';
declare var google: any;

@Component({
  selector: 'app-add-edit-ride',
  templateUrl: './add-edit-ride.component.html',
  styleUrls: ['./add-edit-ride.component.scss'],
})
export class AddEditRideComponent implements OnInit {
  @Input() ride: Ride | null = null; // Input for editing
  @Input() vehicles: any | null = null; // Input for editing
  @Output() save = new EventEmitter<Ride>(); // Emit save event
  @Output() close = new EventEmitter<void>(); // Emit close event

  @ViewChild('pickupInput') pickupInput!: ElementRef;
  @ViewChild('dropInput') dropInput!: ElementRef;

  rideData: Ride = {
    rideId: '',
    driverId: '',
    vehicle: {vehicleNo: '', vehicleModel: ''},
    pickupLocation: '',
    dropLocation: '',
    date: new Date(),
    pricePerPassenger: 0,
    totalSeats: 0,
    availableSeats: 0,
    rideStatus: 'UPCOMING',
  };


  constructor(private ngZone: NgZone, private authService: AuthService){}

  ngOnInit() {
    console.log(this.vehicles)
    // Populate ride data if editing
    if (this.ride) {
      this.rideData = { ...this.ride };
    } else {
      // Default value for adding a new ride
      this.rideData.date = new Date(); // Current date and time
    }
  }

  ngAfterViewInit(): void {
    // Initialize Google Places Autocomplete for Pickup Location
    const pickupAutocomplete = new google.maps.places.Autocomplete(
      this.pickupInput.nativeElement,
      { types: ['geocode'] }
    );

    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      this.ngZone.run(() => {
        this.rideData.pickupLocation = place.formatted_address;
      });
    });
    

    // Initialize Google Places Autocomplete for Drop Location
    const dropAutocomplete = new google.maps.places.Autocomplete(
      this.dropInput.nativeElement,
      { types: ['geocode'] }
    );

    dropAutocomplete.addListener('place_changed', () => {
      const place = dropAutocomplete.getPlace();
      this.ngZone.run(() => {
        this.rideData.dropLocation = place.formatted_address;
      });
    });
  }


  isLocationsEqual(): boolean {
    return (
      this.rideData.pickupLocation.trim() !== '' &&
      this.rideData.dropLocation.trim() !== '' &&
      this.rideData.pickupLocation.trim() ===
        this.rideData.dropLocation.trim()
    );
  }

  saveRide() {

    if (!this.isLocationsEqual()) {
      // Ensure the date is a proper ISO 8601 string
      this.rideData.date = new Date(this.rideData.date);
      this.rideData.estimatedDate = new Date(this.rideData.estimatedDate?this.rideData.estimatedDate : '');
      this.save.emit(this.rideData); // Emit the ride data to parent
    } else {
      console.error('Pickup and drop locations cannot be the same.');
    }
    
  }

  onModelChange(event: any){
    this.authService.getVehicleById(this.rideData.vehicle.vehicleNo).subscribe({
      next: (response) => {
        this.rideData.availableSeats = response.seating;
        console.log(response, this.rideData.availableSeats)
      },
      error: (err) =>{
        console.error('Ride  posting unsuccesful:', err);
      }
    })
  }

  closeOverlay() {
    this.close.emit(); // Close the overlay
  }
}
