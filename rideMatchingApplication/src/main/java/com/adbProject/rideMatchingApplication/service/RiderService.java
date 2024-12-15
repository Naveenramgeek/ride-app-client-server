package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.model.Rider;
import com.adbProject.rideMatchingApplication.repository.RiderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiderService {

    @Autowired
    RiderRepository riderRepository;

    public Rider postRider(Rider rider) {
        return riderRepository.save(rider);
    }

    public List<Rider> getAvailableRiders() {
        return riderRepository.findAll();
    }

    public Rider getRiderById(String id) {
        return riderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }
}
