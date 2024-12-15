package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Driver;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DriverRepository extends MongoRepository<Driver, String> {}
