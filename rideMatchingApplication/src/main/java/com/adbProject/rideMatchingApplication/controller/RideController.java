package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Ride;
import com.adbProject.rideMatchingApplication.service.RideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rides")
public class RideController {

    @Autowired
    private RideService rideService;

    @PostMapping
    public Ride postRide(@RequestBody Ride ride) {
        return rideService.postRide(ride);
    }

    @PutMapping
    public Ride updateRide(@RequestBody Ride ride) {
        return rideService.postRide(ride);
    }

    @GetMapping
    public List<Ride> getAvailableRides() {
        return rideService.getAvailableRides();
    }

    @GetMapping("/ride")
    public Ride getRideById(@RequestParam(name = "id", required = true) String id) {
        return rideService.getRideById(id);
    }

    @GetMapping("/ridesByIds")
    public List<Ride> getRidesById(@RequestParam List<String> ids) {
        return rideService.getRidesByI(ids);
    }

    @GetMapping("/driver")
    public Optional<List<Ride>> getRideByDriverId(@RequestParam(name = "driverId", required = true) String driverId) {
        return rideService.getRidesByDriverId(driverId);
    }

    @PostMapping("/cancel")
    public Ride cancelRideById(@RequestBody Ride ride) {
        //cancel bookings by rideId
        //send mail regarding canceling the ride
       return rideService.postRide(ride);
    }

}
