package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.dto.DashboardMetrics;
import com.adbProject.rideMatchingApplication.model.Admin;
import com.adbProject.rideMatchingApplication.repository.AdminRepository;
import com.adbProject.rideMatchingApplication.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    AdminRepository adminRepository;

    @GetMapping("/dashboard-metrics")
    public DashboardMetrics getDashboardMetrics(){
        return adminService.getDashboardMetrics();
    }

    @PostMapping()
    public Admin createAdmin(@RequestBody Admin admin){
        return adminRepository.save(admin);
    }
}
