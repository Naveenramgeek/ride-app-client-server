package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentRepository extends MongoRepository<Payment, String> {

    List<Payment> findByRiderId(String riderId);

    List<Payment> findByRideId(String rideId);

    List<Payment> findByBookingId(String bookingId);

    List<Payment> findByDriverId(String driverId);

    List<Payment> findByPaymentStatus(String status);

    List<Payment> findByBookingIdAndPaymentStatus(String bookingId, String status);
}
