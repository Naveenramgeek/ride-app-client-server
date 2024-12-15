package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.model.Driver;
import com.adbProject.rideMatchingApplication.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    @Autowired
    DriverRepository driverRepository;

    public Driver postDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public List<Driver> getAvailableDrivers() {
        return driverRepository.findAll();
    }

    public Driver getDriverById(String id) {
        return driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }
}
