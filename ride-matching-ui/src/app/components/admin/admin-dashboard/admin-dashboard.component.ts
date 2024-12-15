import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  dadhboardMetrics: any;

  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.authService.getDashboardMetrics().subscribe({
      next: (response) => {
        this.dadhboardMetrics = response;
        console.log('Rider Signup successful:', response);
      },
      error: (err) =>{
        console.error('rider Signup error:', err);
      }
    })
  }
  
}
