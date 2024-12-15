package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.model.Vehicle;
import com.adbProject.rideMatchingApplication.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    @Autowired
    VehicleRepository vehicleRepository;

    public Vehicle postVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findAll();
    }

    public Vehicle getVehicleById(String id) {
        return vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }

    public List<Vehicle> getVehiclesById(List<String> ids) {
        return vehicleRepository.findAllById(ids);
    }

    public void deleteVehicleById(String id) {
        vehicleRepository.deleteById(id);
    }
}
