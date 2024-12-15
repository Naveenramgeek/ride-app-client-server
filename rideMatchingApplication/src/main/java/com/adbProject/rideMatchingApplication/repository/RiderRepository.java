package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Rider;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RiderRepository extends MongoRepository<Rider, String> {}
