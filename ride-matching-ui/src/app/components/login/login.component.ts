import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  forgetPasswordflag = false;
  loginflag = true;
  forgetemail = false;
  
  user = {
    email: '',
    password: '',
    role: ''
  };
  errorMessage = '';
  error = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if(this.router.url.includes('rider-login')){
      this.user.role = 'RIDER'
    }
    if(this.router.url.includes('driver-login')){
      this.user.role = 'DRIVER'
    }
    if(this.router.url.includes('admin-login')){
      this.user.role = 'ADMIN'
    }
    
    localStorage.setItem('userRole', this.user.role);
  }
  
  login(): void {
    this.authService.login(this.user.email, this.user.password, this.user.role).subscribe({
      next: (response) => {
        const token = response.token;
        localStorage.setItem('authToken', token); // Save token for authenticated requests
        localStorage.setItem('userEmail', this.user.email);
        console.log('Login successful:', token);
        if(this.user.role === 'RIDER'){
          this.router.navigate(['/rider/ride-details']);
        }
        if(this.user.role === 'DRIVER'){
          this.router.navigate(['/driver/rides']);
        }
        if(this.user.role === 'ADMIN'){
          this.router.navigate(['/admin/dashboard']);
        }
        this.error = false;
      },
      error: (err) => {
        this.errorMessage = 'Invalid Email or password.';
        this.error = true;
        console.error('Login error:', err);
      },
    });
  }

  forgetPassword(){
    this.forgetPasswordflag = true;
    this.loginflag = false;
  }

  forgetEmail(){
    this.forgetPasswordflag = true;
    this.loginflag = false;
  }

  resetPassword(){
    
  }
}
