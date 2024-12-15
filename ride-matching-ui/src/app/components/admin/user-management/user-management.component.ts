import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
users: User[] = []; // All users
filteredUsers: any[] = []; // Users after applying filters
paginatedUsers: any[] = []; // Users for the current page
showForm: boolean = false; // Form modal visibility
editingUser: any = null; // User being edited
formData: any = {}; // Data for the form
useralreadyExixts = false;
curentUser: User | undefined;

// Pagination settings
currentPage: number = 1;
itemsPerPage: number = 10;
totalPages: number = 1;

// Filters
filters = {
  name: '',
  userId: '',
  role: '',
};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.applyFilters();
        console.log('Rider Signup successful:', response);
      },
      error: (err) =>{
        console.error('rider Signup error:', err);
      }
    })
  }

  showFilterModal: boolean = false; // Controls advanced filter modal visibility

  applyFilters() {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (!this.filters.name || `${user.firstName} ${user.lastName}`.toLowerCase().includes(this.filters.name.toLowerCase())) &&
        (!this.filters.userId || user.userId.toLowerCase().includes(this.filters.userId.toLowerCase())) &&
        (!this.filters.role || user.role === this.filters.role)
      );
    });
    this.calculatePagination();
  }

  // Calculate pagination
  calculatePagination() {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.updatePaginatedUsers();
  }

  // Update users for the current page
  updatePaginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(start, end);
  }

  // Change page
  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedUsers();
  }

  // Change items per page
  changeItemsPerPage() {
    this.currentPage = 1; // Reset to first page
    this.calculatePagination();
  }

  // Open form for Add or Edit
  openRiderForm() {
    let role = 'driver';
    this.router.navigate(['/rider-signup']);
  }

  openDriverForm(){
    this.router.navigate(['/driver-signup']);
  }

  updateUser(user: any){
    let role = user.role;
    if(user.role = 'RIDER'){
      this.router.navigate(['/rider-signup'], {
        state: {role, user},
      });
    }
    if(user.role = 'DRIVER'){
      this.router.navigate(['/driver-signup'], {
        state: {role, user},
      });
    }
  }

  // Save user (Add or Update)
  saveUser() {
    if (this.editingUser) {
      // Update existing user
      this.authService.signup(this.formData).subscribe({
        next: (response) => {
          this.fetchUsers();
        this.closeForm();
          console.log('Rider Signup successful:', response);
        },
        error: (err) =>{
          console.error('rider Signup error:', err);
        }
      })
    } else {
      this.authService.updateUser(this.formData).subscribe({
        next: (response) => {
          this.fetchUsers();
        this.closeForm();
          console.log('Rider Signup successful:', response);
        },
        error: (err) =>{
          console.error('rider Signup error:', err);
        }
      })
    }
  }

  // Delete user
  deleteUser(userId: string) {
    this.authService.deleteUser(userId).subscribe({
      next: (response) => {
        this.fetchUsers();
        console.log('Rider Signup successful:', response);
      },
      error: (err) =>{
        console.error('rider Signup error:', err);
      }
    })
  }

  // Close form modal
  closeForm() {
    this.showForm = false;
    this.editingUser = null;
    this.formData = {};
  }
}
