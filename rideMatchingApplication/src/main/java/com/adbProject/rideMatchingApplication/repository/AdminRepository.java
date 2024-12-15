package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.Admin;
import com.adbProject.rideMatchingApplication.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
}
