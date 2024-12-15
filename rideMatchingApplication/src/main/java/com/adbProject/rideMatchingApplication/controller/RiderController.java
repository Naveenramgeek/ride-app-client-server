package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Driver;
import com.adbProject.rideMatchingApplication.model.Ride;
import com.adbProject.rideMatchingApplication.model.Rider;
import com.adbProject.rideMatchingApplication.model.User;
import com.adbProject.rideMatchingApplication.repository.UserRepository;
import com.adbProject.rideMatchingApplication.service.RiderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/riders")
public class RiderController {

    @Autowired
    RiderService riderService;

    private final UserRepository userRepository;

    public RiderController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signupRider")
    public Rider createDriver(@RequestBody Rider rider) {
        return riderService.postRider(rider);
    }

    @GetMapping
    public List<Rider> getAvailableRiders() {
        return riderService.getAvailableRiders();
    }

    @PutMapping("/updateRider")
    public Rider updateRider(@RequestBody Rider rider) {
        return riderService.postRider(rider);
    }

    @GetMapping("/rider")
    public Rider getDriverById(@RequestParam(name = "id", required = true) String id) {
        return riderService.getRiderById(id);
    }

    @GetMapping("/riderByEmail")
    public Rider getRiderByEmail(@RequestParam(name = "email", required = true) String email,
                                @RequestParam(name = "role", required = true) String role){
        Optional<User> user = this.userRepository.findByEmailAndRole(email, role);
        if(user.isPresent()) {
            return riderService.getRiderById(user.get().getUserId());
        }

        return new Rider();
    }
}
