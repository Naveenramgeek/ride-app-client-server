import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/driver/dashboard/dashboard.component';
import { BookingsPageComponent } from './components/driver/bookings-page/bookings-page.component';
import { RidesPageComponent } from './components/driver/rides-page/rides-page.component';
import { EarningsComponent } from './components/driver/earnings/earnings.component';
import { DriverProfileComponent } from './components/driver/driver-profile/driver-profile.component';
import { RatingsFeedbackComponent } from './components/driver/ratings-feedback/ratings-feedback.component';
import { RideDetailsComponent } from './components/rider/ride-details/ride-details.component';
import { RidesListingPageComponent } from './components/rider/rides-listing-page/rides-listing-page.component';
import { MyBookingsComponent } from './components/rider/my-bookings/my-bookings.component';
import { PaymentHistoryComponent } from './components/rider/payment-history/payment-history.component';
import { FeedbackRatingComponent } from './components/rider/feedback-rating/feedback-rating.component';
import { RiderProfileComponent } from './components/rider/rider-profile/rider-profile.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { DriverSignupComponent } from './components/driver-signup/driver-signup.component';
import { RiderSignupComponent } from './components/rider-signup/rider-signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DriverResolverService } from './services/resolvers/driver-resolver.service';
import { RidesResolverService } from './services/resolvers/rides-resolver.service';
import { RiderResolverService } from './services/resolvers/rider-resolver.service';
import { DriverBookingsResolverService } from './services/resolvers/driver-bookings-resolver.service';
import { RiderPaymentsResolverService } from './services/resolvers/rider-payments-resolver.service';
import { DriverEarningsResolverService } from './services/resolvers/driver-earnings-resolver.service';
import { DriverProfileResolver } from './services/resolvers/driver-profile-resolver.service';
import { RiderProfileResolverService } from './services/resolvers/rider-profile-resolver.service';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { RidesManagementComponent } from './components/admin/rides-management/rides-management.component';
import { BookingsResolverService } from './services/resolvers/bookings-resolver.service';
import { BookingsManagementComponent } from './components/admin/bookings-management/bookings-management.component';

const routes: Routes = [
// { path: '',   redirectTo: '/driver', pathMatch: 'full' },
  { path: '', component: LandingPageComponent },
  { path: 'admin/usermanagement', component: UserManagementComponent, canActivate: [AuthGuard], data: {role: 'ADMIN'} },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: {role: 'ADMIN'} },
  { path: 'admin/ridesmanagement', component: RidesManagementComponent, resolve: {rides: RidesResolverService}, canActivate: [AuthGuard], data: {role: 'ADMIN'} },
  { path: 'admin/bookingsmanagement', component: BookingsManagementComponent, resolve: {rides: RidesResolverService, bookings: BookingsResolverService}, canActivate: [AuthGuard], data: {role: 'ADMIN'} },

  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'driver-signup', component: DriverSignupComponent },
  { path: 'rider-signup', component: RiderSignupComponent },
  { path: 'driver-login', component: LoginComponent },
  { path: 'rider-login', component: LoginComponent },
  { path: 'admin-login', component: LoginComponent },

  
  { path: 'driver/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {role: 'DRIVER'} },
  { path: 'driver/bookings/:rideId', component: BookingsPageComponent, canActivate: [AuthGuard],resolve: {bookingData: DriverBookingsResolverService}, data: {role: 'DRIVER'} },
  { path: 'driver/rides', component: RidesPageComponent, canActivate: [AuthGuard], resolve: { driverData: DriverResolverService }, data: {role: 'DRIVER'} },
  { path: 'driver/earnings', component: EarningsComponent, canActivate: [AuthGuard], resolve: { paymentsData: DriverEarningsResolverService }, data: {role: 'DRIVER'} },
  { path: 'driver/ratings&feedback', component: RatingsFeedbackComponent, canActivate: [AuthGuard], data: {role: 'DRIVER'} },
  { path: 'driver/profile', component: DriverProfileComponent, canActivate: [AuthGuard], resolve: { driverProfileData: DriverProfileResolver },  data: {role: 'DRIVER'} },


  { path: 'rider/ride-details', component: RidesListingPageComponent, canActivate: [AuthGuard], resolve: {rides: RidesResolverService}, data: {role: 'RIDER'} },
  { path: 'rider/ride-details/:rideId', component: RideDetailsComponent, canActivate: [AuthGuard], resolve: { riderData: RiderResolverService }, data: {role: 'RIDER'} },
  { path: 'rider/my-bookings', component: MyBookingsComponent, canActivate: [AuthGuard], resolve: { driverData: DriverResolverService , riderData: RiderResolverService}, data: {role: 'RIDER'} },
  { path: 'rider/payments', component: PaymentHistoryComponent, canActivate: [AuthGuard], resolve: { paymentsData: RiderPaymentsResolverService }, data: {role: 'RIDER'} },
  { path: 'rider/feedback', component: FeedbackRatingComponent, canActivate: [AuthGuard] , data: {role: 'RIDER'} },
  { path: 'rider/profile', component: RiderProfileComponent, canActivate: [AuthGuard], resolve: { riderProfileData: RiderProfileResolverService }, data: {role: 'RIDER'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
