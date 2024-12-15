package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {}
