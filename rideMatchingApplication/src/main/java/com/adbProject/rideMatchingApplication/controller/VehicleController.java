package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Vehicle;
import com.adbProject.rideMatchingApplication.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @PostMapping
    public Vehicle postVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.postVehicle(vehicle);
    }

    @GetMapping
    public List<Vehicle> getAvailableVehicles() {
        return vehicleService.getAvailableVehicles();
    }

    @GetMapping("/vehicle")
    public Vehicle getVehicleById(@RequestParam(name = "id", required = true) String id) {
        return vehicleService.getVehicleById(id);
    }

    @GetMapping("/vehiclesByID")
    public List<Vehicle> getVehiclesById(@RequestParam(name = "ids", required = true) List<String> ids) {
        return vehicleService.getVehiclesById(ids);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteVehicleById(@RequestParam(name = "id", required = true) String id) {
        vehicleService.deleteVehicleById(id);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }
}
