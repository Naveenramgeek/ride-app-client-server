import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { Rider } from '../../models/rider.model';
import { AuthService } from '../../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { BasicDetailsComponent } from '../basic-details/basic-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rider-signup',
  templateUrl: './rider-signup.component.html',
  styleUrl: './rider-signup.component.scss'
})
export class RiderSignupComponent {
  currentStep = 1;
  errorMessage = '';
  useralreadyExixts = false;

  rider = {
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
    cardDetails: {
      cardNumber: null,
      expiryDate: '',
      securityCode: null,
      cardHolderName: '',
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild(BasicDetailsComponent) basicDetailsComponent!: BasicDetailsComponent;
  
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
    if (this.currentStep < 2) this.currentStep++;
  }

  previousStep(): void {
    if (this.currentStep > 1) this.currentStep--;
  }

  submit(): void {
    const myUuid = uuidv4();
    let user = {
      userId: myUuid,
      firstName: this.rider.firstName,
      lastName: this.rider.lastName,
      phone: this.rider.phone ?  this.rider.phone : 0,
      email: this.rider.email,
      password: this.rider.password,
      address: this.rider.address,
      role: 'RIDER',
      proofOfIdentity: {
        idNumber: this.rider.proofOfIdentity.idNumber,
        idType: this.rider.proofOfIdentity.idType,
        countryProvided: this.rider.proofOfIdentity.countryProvided
      },
      tokenExpiry: 0
    } 

    let rider = {
      userId: myUuid,
      bookings: [],
      cardDetails: {
        cardHolderName: this.rider.cardDetails.cardHolderName,
        cardNumber: this.rider.cardDetails.cardNumber ? this.rider.cardDetails.cardNumber : 0,
        securityCode: this.rider.cardDetails.securityCode ? this.rider.cardDetails.securityCode : 0,
        expiryDate: this.rider.cardDetails.expiryDate

      }
    }

    this.authService.signup(user).subscribe({
      next: (response) => {
        localStorage.setItem('user', response); // Save token for authenticated requests
        console.log('Signup successful:', response);

        this.authService.signupRider(rider).subscribe({
          next: (response) => {
            localStorage.setItem('rider', response); // Save token for authenticated requests
            console.log('Rider Signup successful:', response);
          },
          error: (err) =>{
            this.errorMessage = 'Error while storing the rider';
            console.error('rider Signup error:', err);
          }
        })
        this.router.navigate(['/rider-login']);
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
