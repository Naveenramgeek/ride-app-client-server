import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrl: './basic-details.component.scss'
})
export class BasicDetailsComponent {
  @Input() userData: any;
  @Input() useralreadyExixts = false;
  @ViewChild('basicForm') basicForm!: NgForm;
  touched = false;
  confirmPassword: string = '';

  isFormValid() {
    return this.basicForm && this.basicForm.valid;
  }

  // Trigger form validation messages
  triggerValidation(): void {
    if (this.basicForm?.form) {
      this.basicForm.form.markAllAsTouched(); // Mark all controls as touched
      this.touched = true;
    } else {
      console.error('Form is not yet initialized.');
    }
  }
}
