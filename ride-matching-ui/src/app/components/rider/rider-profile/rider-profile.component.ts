import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Rider } from '../../../models/rider.model';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rider-profile',
  templateUrl: './rider-profile.component.html',
  styleUrl: './rider-profile.component.scss'
})
export class RiderProfileComponent implements OnInit {
  user!: User;
  rider!: Rider;

  editPersonalInfoMode = false;
  editCardMode = false;

  constructor(private authService: AuthService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.rider = data['riderProfileData'].rider; // Access resolved data
      this.user = data['riderProfileData'].user;
    });
  }

  // Upload Profile Picture
  onProfilePictureUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePictureUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePicture(fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];
    if (file) {
      this.authService.updateUser(this.user).subscribe((user) => {
        console.log(this.user)
      });
    }
  }

  // Edit Personal Information
  savePersonalInfo() {
    this.editPersonalInfoMode = false;
    this.authService.updateUser(this.user).subscribe((user) => {
      console.log(this.user)
    });
    // Add API call to save personal information
  }

  cancelPersonalInfoEdit() {
    this.editPersonalInfoMode = false;
    // Optionally reset unsaved changes
  }

  // Edit Card Details
  saveCardDetails() {
    this.editCardMode = false;
    console.log(this.rider)
    this.authService.updateRider(this.rider).subscribe((rider) => {
      console.log(this.user)
    });
    console.log('Card Details Saved:', this.rider.cardDetails);
    // Add API call to save card details
  }

  cancelCardEdit() {
    this.editCardMode = false;
    // Optionally reset unsaved changes
  }
}
