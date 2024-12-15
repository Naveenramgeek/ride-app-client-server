import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { DashboardComponent } from './components/driver/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RidesPageComponent } from './components/driver/rides-page/rides-page.component';
import { AddEditRideComponent } from './components/driver/add-edit-ride/add-edit-ride.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingsPageComponent } from './components/driver/bookings-page/bookings-page.component';
import { BookingCardComponent } from './components/driver/booking-card/booking-card.component';
import { EarningsComponent } from './components/driver/earnings/earnings.component';
import { RatingsFeedbackComponent } from './components/driver/ratings-feedback/ratings-feedback.component';
import { DriverProfileComponent } from './components/driver/driver-profile/driver-profile.component';
import { RidesListingPageComponent } from './components/rider/rides-listing-page/rides-listing-page.component';
import { RideDetailsComponent } from './components/rider/ride-details/ride-details.component';
import { BookingFormComponent } from './components/rider/booking-form/booking-form.component';
import { MyBookingsComponent } from './components/rider/my-bookings/my-bookings.component';
import { PaymentHistoryComponent } from './components/rider/payment-history/payment-history.component';
import { FeedbackRatingComponent } from './components/rider/feedback-rating/feedback-rating.component';
import { RiderProfileComponent } from './components/rider/rider-profile/rider-profile.component';
import { DriverSignupComponent } from './components/driver-signup/driver-signup.component';
import { RiderSignupComponent } from './components/rider-signup/rider-signup.component';
import { LoginComponent } from './components/login/login.component';
import { BasicDetailsComponent } from './components/basic-details/basic-details.component'; // Import forms modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserManagementComponent } from './components/admin/user-management/user-management.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { RidesManagementComponent } from './components/admin/rides-management/rides-management.component';
import { BookingsManagementComponent } from './components/admin/bookings-management/bookings-management.component';
import { ForgotPasswordComponentComponent } from './components/forgot-password-component/forgot-password-component.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    SignupPageComponent,
    DashboardComponent,
    NavbarComponent,
    RidesPageComponent,
    AddEditRideComponent,
    BookingsPageComponent,
    BookingCardComponent,
    EarningsComponent,
    RatingsFeedbackComponent,
    DriverProfileComponent,
    RidesListingPageComponent,
    RideDetailsComponent,
    BookingFormComponent,
    MyBookingsComponent,
    PaymentHistoryComponent,
    FeedbackRatingComponent,
    RiderProfileComponent,
    DriverSignupComponent,
    RiderSignupComponent,
    LoginComponent,
    BasicDetailsComponent,
    UserManagementComponent,
    AdminDashboardComponent,
    RidesManagementComponent,
    BookingsManagementComponent,
    ForgotPasswordComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
