package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.model.Ride;
import com.adbProject.rideMatchingApplication.repository.RideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RideService {

    @Autowired
    private RideRepository rideRepository;

    public Ride postRide(Ride ride) {
        return rideRepository.save(ride);
    }


    public List<Ride> getAvailableRides() {
        return rideRepository.findAll();
    }

    public List<Ride> getRidesByI(List<String> ids) {
        return rideRepository.findAllById(ids);
    }

    public Optional<List<Ride>> getRidesByDriverId(String driverId) {
        return rideRepository.findByDriverId(driverId);
    }

    public Ride getRideById(String id) {
        return rideRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }

    public void updateAvailableSeats(String id, int seatsBooked, String status) {
        Ride ride = getRideById(id);
        if (ride.getAvailableSeats() < seatsBooked) {
            throw new RuntimeException("Not enough seats available");
        } else {
            ride.setAvailableSeats(ride.getAvailableSeats() - seatsBooked);
        }
        rideRepository.save(ride);
    }

    public void updateAvailableSeatsWhenBookingUpdate(String id, int seatsBooked){
        Ride ride = getRideById(id);
        ride.setAvailableSeats(ride.getAvailableSeats() + seatsBooked);
        rideRepository.save(ride);
    }

    public void deleteRideById(String id){
        rideRepository.deleteById(id);
    }
}
