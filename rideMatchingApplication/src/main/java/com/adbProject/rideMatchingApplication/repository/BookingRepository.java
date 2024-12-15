package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByRiderId(String riderId);

    List<Booking> findByRideId(String rideId);
}
