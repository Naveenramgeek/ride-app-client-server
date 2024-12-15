import { Component } from '@angular/core';
import { Ride } from '../../../models/ride.model';
import { Driver } from '../../../models/driver.model';
import { Vehicle } from '../../../models/vehicle.model';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-rides-listing-page',
  templateUrl: './rides-listing-page.component.html',
  styleUrl: './rides-listing-page.component.scss'
})
export class RidesListingPageComponent {
  rides!: Ride[];
  availableRides: any;

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

  vehicles: Vehicle[] = [
    {
      vehicleNo: 'V001',
      vehicleModel: 'Sedan',
      color: 'Black',
      ratings: 4.5,
      year: 2020,
      seating: 4,
      image: 'assets/sedan.jpg',
    },
    {
      vehicleNo: 'V002',
      vehicleModel: 'SUV',
      color: 'White',
      ratings: 4.7,
      year: 2021,
      seating: 5,
      image: 'assets/suv.jpg',
    },
  ];

  filteredRides: (Ride & {
    driverName: string;
    driverRating: number;
    vehicleModel: string;
    vehicleImage: string;
  })[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    //this.populateRideDetails();
    this.route.data.subscribe((data) => {
      console.log(data['rides'])
      this.rides = data['rides'];
      this.availableRides = this.rides.filter(ride => ride.rideStatus === "UPCOMING" && moment(ride.date).local().isAfter(moment()));
    })
  }

  // Populate rides with driver and vehicle details
  populateRideDetails(): void {
    this.filteredRides = this.rides.map((ride) => {
      const driver = this.drivers.find((d) => d.userId === ride.driverId);
      const vehicle = this.vehicles.find((v) => v.vehicleNo === ride.vehicle.vehicleNo);

      return {
        ...ride,
        driverName: driver ? `${driver.firstName} ${driver.lastName}` : 'Unknown Driver',
        driverRating: driver?.ratings || 0,
        vehicleModel: vehicle?.vehicleModel || 'Unknown Model',
        vehicleImage: vehicle?.image || 'assets/default-vehicle.jpg',
      };
    });
  }

  convertToLocalTimezone(dateString: any): string {
    // Parse the date string and convert to local timezone
    const localDate = moment(dateString).local();
    return localDate.format('YYYY-MM-DD hh:mm A'); // Format with AM/PM
  }

  // // Filter rides based on pickup, drop, and time
  // filterRides(location: string, date: string, time: string): void {
  //   const searchDateTime = new Date(`${date}T${time}`);
  //   this.filteredRides = this.rides
  //     .filter((ride) => {
  //       return (
  //         ride.pickupLocation.toLowerCase().includes(location.toLowerCase()) ||
  //         ride.dropLocation.toLowerCase().includes(location.toLowerCase()) ||
  //         Math.abs(ride.date.getTime() - searchDateTime.getTime()) <= 3600000
  //       );
  //     })
  //     .map((ride) => {
  //       const driver = this.drivers.find((d) => d.userId === ride.driverId);
  //       const vehicle = this.vehicles.find((v) => v.vehicleNo === ride.vehicle.vehicleNo);

  //       return {
  //         ...ride,
  //         driverName: driver ? `${driver.firstName} ${driver.lastName}` : 'Unknown Driver',
  //         driverRating: driver?.ratings || 0,
  //         vehicleModel: vehicle?.vehicleModel || 'Unknown Model',
  //         vehicleImage: vehicle?.image || 'assets/default-vehicle.jpg',
  //       };
  //     });
  // }

  viewRideDetails(ride: Ride): void {
    let driver;
    this.authService.getUserById(ride.driverId).subscribe({
      next: (response) => {
        driver = response;
        this.router.navigate(['/rider/ride-details', ride.rideId], {
          state: { ride, driver },
        });
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
  }
}
