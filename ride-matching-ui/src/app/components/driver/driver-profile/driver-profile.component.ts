import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';
import { Driver } from '../../../models/driver.model';
import { Vehicle } from '../../../models/vehicle.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.scss'
})
export class DriverProfileComponent implements OnInit {
  selectedFile!: File;
  profilePictureUrl!: string;

  user!: User;
  driver!: Driver;
  vehicles: Vehicle[] = [];

  newPassword: string = '';
  confirmPassword: string = '';
  showAddVehicleForm = false;

  newVehicle: Vehicle = {
        vehicleNo: '',
        vehicleModel: '',
        color: '',
        ratings: 0,
        year: 0,
        seating: 0,
        image: '',
  };

  constructor(private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.driver = data['driverProfileData'].driver; // Access resolved data
      this.user = data['driverProfileData'].user;
      this.vehicles = data['driverProfileData'].vehicles;
    });
  }

  
  onProfilePictureUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.user.profilePictureUrl = reader.result as string; // Reflect the image in UI
    };
    reader.readAsDataURL(file);
  }
}

  uploadProfilePicture(fileInput: HTMLInputElement) {
    const file = fileInput.files?.[0];
    if (file) {
      this.authService.updateUser(this.user).subscribe((url) => {
        console.log(this.user)
      });
    }
  }

  updatePassword() {
    if (this.newPassword === this.confirmPassword) {
      alert('Password updated successfully!');
      this.user.password = this.newPassword;
      this.authService.updateUser(this.user).subscribe((url) => {
        console.log(this.user)
        this.newPassword = '';
        this.confirmPassword = '';
      });
    } else {
      alert('Passwords do not match!');
    }
  }

  onVehicleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newVehicle.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
  addVehicle() {
    if (this.newVehicle.vehicleModel && this.newVehicle.vehicleNo) {
      this.vehicles.push({ ...this.newVehicle });
      this.authService.uploadVehicle(this.newVehicle).subscribe((vehicle) => {
        console.log(vehicle)
      });
      this.driver.vehicles.push({vehicleNo: this.newVehicle.vehicleNo, vehicleModel: this.newVehicle.vehicleModel})
      this.authService.updateDriver(this.driver).subscribe((vehicle) => {
        console.log(this.driver)
      });
      this.showAddVehicleForm = false;
    } else {
      alert('Please fill all required fields!');
    }
    this.newVehicle = {
      vehicleNo: '',
      vehicleModel: '',
      color: '',
      ratings: 0,
      year: 0,
      seating: 0,
      image: '',
    };
  }
  
  deleteVehicle(index: number) {
    this.vehicles.splice(index, 1);
  }

  closeForm(){
    this.showAddVehicleForm = false;
  }
}
