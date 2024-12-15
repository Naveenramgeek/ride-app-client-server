import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Driver } from '../../models/driver.model';
import { v4 as uuidv4 } from 'uuid';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-driver-signup',
  templateUrl: './driver-signup.component.html',
  styleUrl: './driver-signup.component.scss'
})
export class DriverSignupComponent implements OnInit {
  currentStep = 1;
  errorMessage = '';
  useralreadyExixts = false;
  driver = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: undefined,
    address: '',
    proofOfIdentity: {
      idNumber: '',
      idType: '',
      countryProvided: ''
    },
    balance: 0.0,
    licenseInfo: '',
    bankDetails: {
      recipientName: '',
      accountNumber: null,
      routingNumber: '',
    },
    vehicles:
      {
        vehicleNo: '',
        vehicleModel: '',
        color: '',
        year: null,
        seating: null,
        image: '',
      },
  };

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    const state = history.state;
    let user = state.user;
    if(user){
      this.driver.firstName = user.firstName;
      console.log(user)
    }
  }
  
  @ViewChild(BasicDetailsComponent) basicDetailsComponent!: BasicDetailsComponent;
  @ViewChild('bankdetails') basicForm!: NgForm;
  
  goToBankDetails(){
    if (this.basicDetailsComponent.isFormValid()) {
      console.log('Navigating to the next page');
      if (this.currentStep < 3) this.currentStep++;
    } else {
      console.log('Form is invalid, staying on the current page');
      // Trigger validation messages in the form
      this.basicDetailsComponent.triggerValidation();
    }
  }
  nextStep(): void {
    if (this.currentStep < 3) this.currentStep++;
  }

  previousStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }
  onCarPictureUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.driver.vehicles.image = reader.result as string; // Reflect the image in UI
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    const myUuid = uuidv4();

    let user: User = {
      userId: myUuid,
      firstName: this.driver.firstName,
      lastName: this.driver.lastName,
      phone: this.driver.phone ?  this.driver.phone : 0,
      email: this.driver.email,
      password: this.driver.password,
      address: this.driver.address,
      role: 'DRIVER',
      proofOfIdentity: {
        idNumber: this.driver.proofOfIdentity.idNumber,
        idType: this.driver.proofOfIdentity.idType,
        countryProvided: this.driver.proofOfIdentity.countryProvided
      },
      tokenExpiry: 0
    } 

    let vehicles: { vehicleNo: string; vehicleModel: string }[] = [];
      vehicles.push({"vehicleNo": this.driver.vehicles.vehicleNo ,"vehicleModel": this.driver.vehicles.vehicleModel});

    let driver: Driver = {
      userId: myUuid,
      balance: this.driver.balance,
      licenseInfo: this.driver.licenseInfo,
      ratings: 0.0,
      vehicles: vehicles,
      bankDetails:{
        accountNumber: this.driver.bankDetails.accountNumber ? this.driver.bankDetails.accountNumber : 0,
        recipientName: this.driver.bankDetails.recipientName,
        routingNumber: this.driver.bankDetails.routingNumber
      } 

    }

    let vehicle: Vehicle = {
      vehicleNo: this.driver.vehicles.vehicleNo,
      vehicleModel: this.driver.vehicles.vehicleModel,
      color: this.driver.vehicles.color,
      ratings: 0,
      year: this.driver.vehicles.year ? this.driver.vehicles.year : 0,
      seating: this.driver.vehicles.seating ? this.driver.vehicles.seating : 0,
      image: this.driver.vehicles.image
    }

    this.authService.signup(user).subscribe({
      next: (response) => {
        localStorage.setItem('user', response); // Save token for authenticated requests
        console.log('Signup successful:', response);

        this.authService.signupDriver(driver).subscribe({
          next: (response) => {
            localStorage.setItem('driver', response); // Save token for authenticated requests
            console.log('Driver Signup successful:', response);

            this.authService.uploadVehicle(vehicle).subscribe({
              next: (response) => {
                localStorage.setItem('Vehicle', response); // Save token for authenticated requests
                console.log('Vehicle Signup successful:', response);
              },
              error: (err) =>{
                this.errorMessage = 'Error while storing the Driver';
                console.error('Driver Signup error:', err);
              }
            })
          },
          error: (err) =>{
            this.errorMessage = 'Error while storing the Driver';
            console.error('Driver Signup error:', err);
          }
        })
        this.router.navigate(['/driver-login']);
      },
      error: (err) => {
        this.errorMessage = 'Error while storing the user';
        console.error('Signup error:', err.error);
        if(err.error === "User already exists"){
          this.useralreadyExixts = true;
          this.currentStep = 1;
        }
      },
    });
  }
}
