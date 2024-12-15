import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  showDriverNavbar: boolean = false;
  showRiderNavbar: boolean = false;
  showAdminNavbar: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update the variable based on the current URL
        if(this.router.url.includes('login') || this.router.url.includes('signup')){

        } else {
          this.showDriverNavbar = this.router.url.includes('driver');
        }
        
      });

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update the variable based on the current URL
        if(this.router.url.includes('login') || this.router.url.includes('signup') ){

        } else {
          this.showRiderNavbar = this.router.url.includes('rider');
        }
        
      });

      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Update the variable based on the current URL
        if(this.router.url.includes('login') || this.router.url.includes('signup') ){

        } else {
          this.showAdminNavbar = this.router.url.includes('admin');
        }
        
      });
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remove token from storage
    this.router.navigate(['/login']); // Redirect to login page
    this.showRiderNavbar = false;
    this.showDriverNavbar = false;
  }
 
}
