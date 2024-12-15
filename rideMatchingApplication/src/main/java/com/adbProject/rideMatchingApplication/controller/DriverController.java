package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Driver;
import com.adbProject.rideMatchingApplication.model.User;
import com.adbProject.rideMatchingApplication.repository.UserRepository;
import com.adbProject.rideMatchingApplication.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    private final UserRepository userRepository;

    public DriverController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/signupDriver")
    public Driver createDriver(@RequestBody Driver driver) {
        return driverService.postDriver(driver);
    }

    @PutMapping("/updateDriver")
    public Driver updateDriver(@RequestBody Driver driver) {
        return driverService.postDriver(driver);
    }

    @GetMapping
    public List<Driver> getAvailableDrivers() {
        return driverService.getAvailableDrivers();
    }

    @GetMapping("/driver")
    public Driver getDriverById(@RequestParam(name = "id", required = true) String id) {
        return driverService.getDriverById(id);
    }

    @GetMapping("/driverByEmail")
    public Driver getDriverByEmail(@RequestParam(name = "email", required = true) String email,
                                    @RequestParam(name = "role", required = true) String role){
        Optional<User> user = this.userRepository.findByEmailAndRole(email, role);
        if(user.isPresent()) {
            return driverService.getDriverById(user.get().getUserId());
        }

        return new Driver();
    }
}
