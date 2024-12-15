import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password-component.component.html',
  styleUrls: ['./forgot-password-component.component.scss'],
})
export class ForgotPasswordComponentComponent {
  step: 'email' | 'code' | 'reset' = 'email'; // Tracks the current step
  emailForm: FormGroup;
  codeForm: FormGroup;
  resetForm: FormGroup;
  security = '';
  email='';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Step 1: Email Form
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Step 2: Code Form
    this.codeForm = this.fb.group({
      code: ['', [Validators.required]],
    });

    // Step 3: Reset Password Form
    this.resetForm = this.fb.group(
      {
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatch }
    );
  }

  // Custom validator to check if passwords match
  passwordsMatch(group: FormGroup) {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  // Step 1: Submit Email
  onSubmitEmail() {
    if (this.emailForm.valid) {
      this.authService.sendSecurityCode(this.emailForm.value.email).subscribe({
        next: (response) => {
          const token = response.token;
          this.security = token;
          console.log(this.security)
          this.email = this.emailForm.value.email;
          localStorage.setItem(this.emailForm.value.email, token); // Save token for authenticated requests
        },
        error: (err) => {
          
          console.error('Login error:', err);
        },
      });

      console.log('Email submitted:', this.emailForm.value.email);
      // Simulate sending security code
      this.step = 'code';
    }
  }

  // Step 2: Submit Code
  onSubmitCode() {
    if (this.codeForm.valid) {
      console.log('Code submitted:', this.codeForm.value.code);
      if(this.security === this.codeForm.value.code){
        this.step = 'reset';
      } else {

      }
      // Simulate verifying the code
      
    }
  }

  // Step 3: Reset Password
  onSubmitReset() {
    if (this.resetForm.valid) {
      console.log('Password reset successfully:', this.resetForm.value.newPassword);
      console.log(this.email, this.resetForm.value.newPassword)
      this.authService.updatePassword(this.email, this.resetForm.value.newPassword).subscribe({
        next: (response) => {
          const token = response.token;
          this.security = token;
          console.log(this.security)
          this.email = this.emailForm.value.email;
          localStorage.setItem(this.emailForm.value.email, token); // Save token for authenticated requests
        },
        error: (err) => {
          
          console.error('Login error:', err);
        },
      });
      alert('Password reset successful!');
      // Redirect to another page or complete the process
    }
  }
}
