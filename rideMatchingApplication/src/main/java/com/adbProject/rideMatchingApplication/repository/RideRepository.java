package com.adbProject.rideMatchingApplication.repository;


import com.adbProject.rideMatchingApplication.model.Ride;
import com.adbProject.rideMatchingApplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends MongoRepository<Ride, String> {
    Optional<List<Ride>> findByDriverId(String driverId);
    long countByRideStatus(String status);
}
