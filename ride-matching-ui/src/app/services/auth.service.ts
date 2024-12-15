import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { Payment } from '../models/payments.model';
import { Vehicle } from '../models/vehicle.model';
import { Driver } from '../models/driver.model';
import { User } from '../models/user.model';
import { Rider } from '../models/rider.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082'; // Backend URL
  private admin = '/admin';
  private authURL = '/auth';
  private driver = '/drivers';
  private riders = '/riders';
  private deiverData = '/drivers';
  private rides = '/rides';
  private vehicles = '/vehicles';
  private bookings = '/bookings';
  private payments = '/payments';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<any> {
    return this.http.get(`${this.apiUrl+this.admin}/dashboard-metrics`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl+this.authURL}/users`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.authURL}/deleteUser`,{
      params: { id }
    });
  }

  login(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl+this.authURL}/signin`, { email, password , role});
  }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.authURL}/signup`, user);
  }

  signupDriver(driver: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.driver}/signupDriver`,driver);
  }

  signupRider(rider: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.riders}/signupRider`,rider);
  }

  uploadProfilePicture(userId: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl+this.authURL}/upload-profile-picture/${userId}`, formData);
  }

  updateDriver(driver: Driver){
    return this.http.put(`${this.apiUrl+this.driver}/updateDriver`,driver);
  }

  updateRider(rider: Rider){
    return this.http.put(`${this.apiUrl+this.riders}/updateRider`,rider);
  }

  updateUser(user: User){
    return this.http.put(`${this.apiUrl+this.authURL}/update`,user);
  }
  getDriver(email: any, role: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.deiverData}/driverByEmail`,{
      params: { email , role}
    });
  }

  getRider(email: any, role: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.riders}/riderByEmail`,{
      params: { email , role}
    });
  }

  updatePassword(email: any, password: string): Observable<any> {
    console.log("update")
    return this.http.get(`${this.apiUrl+this.authURL}/updatePassword`,{
      params: { email , password}
    });
  }

  postRide(ride: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.rides}`,ride);
  }

  updateRide(ride: any): Observable<any> {
    return this.http.put(`${this.apiUrl+this.rides}`,ride);
  }

  postBookig(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl+this.bookings}`,booking);
  }

  UpdateBookig(booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl+this.bookings}/update`,booking);
  }

  cancelBookig(booking: any): Observable<any> {
    return this.http.put(`${this.apiUrl+this.bookings}/cancel`,booking);
  }

  getRidesByDriverId(driverId: any): Observable<any> {
    return this.http.get(`${this.apiUrl+this.rides}/driver`,{
      params: { driverId}
    });
  }

  getBookingsByRiderId(riderId: any): Observable<any> {
    return this.http.get(`${this.apiUrl+this.bookings}/rider`,{
      params: { riderId}
    });
  }

  getBookingsByRideId(rideId: any): Observable<any> {
    return this.http.get(`${this.apiUrl+this.bookings}/ride`,{
      params: {rideId}
    });
  }

  saveMultipleBookings(bookings: Booking[]): Observable<any> {
    return this.http.post(`${this.apiUrl+this.bookings}/saveALlBookings`,bookings);
  }
  getAllRides(): Observable<any> {
    return this.http.get(`${this.apiUrl+this.rides}`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl+this.bookings}`);
  }

  getDriverById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.driver}/driver`,{
      params: {id}
    });
  }
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.authURL}/user`,{
      params: {id}
    });
  }


  getRideByRideID(id: string){
    return this.http.get(`${this.apiUrl+this.rides}/ride`,{
      params: {id}
    });
  }

  getRidesByRideIds(ids: string[]){
    return this.http.get(`${this.apiUrl+this.rides}/ridesByIds`,{
      params: {ids}
    });
  }

  getUsersByIds(ids: string[]){
    return this.http.get(`${this.apiUrl+this.authURL}/usersByIds`,{
      params: {ids}
    });
  }

  createPayments(payment: Payment): Observable<any>{
    return this.http.post(`${this.apiUrl+this.payments}`,payment);
  }

  updatePayments(payment: Payment): Observable<any>{
    return this.http.put(`${this.apiUrl+this.payments}/updatePayment`,payment);
  }

  completePayments(bookings: Booking[]): Observable<any>{
    return this.http.put(`${this.apiUrl+this.payments}/completePayment`,bookings);
  }

  getPaymentsByDriverId(driverId: string){
    return this.http.get(`${this.apiUrl+this.payments}/driverPayments`,{
      params: {driverId}
    });
  }

  getPaymentsByRiderId(riderId: string){
    return this.http.get(`${this.apiUrl+this.payments}/riderPayments`,{
      params: {riderId}
    });
  }

  getPaymentsByRideId(rideId: string){
    return this.http.get(`${this.apiUrl+this.payments}/ridePayments`,{
      params: {rideId}
    });
  }

  getPaymentsById(id: string){
    return this.http.get(`${this.apiUrl+this.payments}/payment`,{
      params: {id}
    });
  }

  getVehiclesByDriverId(driverId: string): Observable<any> {
    return this.http.get(`${this.apiUrl+this.vehicles}/driver`,{
      params: {driverId}
    });
  }

  uploadVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${this.apiUrl+this.vehicles}`,vehicle);
  }

  deleteVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(`${this.apiUrl+this.vehicles}/delete`,vehicle.vehicleNo);
  }

  getVehicleById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl+this.vehicles}/vehicle`,{
      params: {id}
    });
  }

  getVehiclesByNumber(ids: string[]): Observable<any> {
    return this.http.get(`${this.apiUrl+this.vehicles}/vehiclesByID`,{
      params: {ids}
    });
  }

  sendSecurityCode(email: string[]): Observable<any> {
    return this.http.get(`${this.apiUrl+this.authURL}/sendSecurityCode`,{
      params: {email}
    });
  }
}