package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.dto.DashboardMetrics;
import com.adbProject.rideMatchingApplication.model.Payment;
import com.adbProject.rideMatchingApplication.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private RiderRepository riderRepository;

    @Autowired
    private RideRepository rideRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public DashboardMetrics getDashboardMetrics(){
        DashboardMetrics dashboardMetrics = new DashboardMetrics();

        dashboardMetrics.setTotalUsers((int) userRepository.count());
        dashboardMetrics.setTotalDrivers((int) driverRepository.count());
        dashboardMetrics.setTotalRiders((int) riderRepository.count());
        dashboardMetrics.setSuccessfulRides((int) rideRepository.countByRideStatus("COMPLETED"));
        dashboardMetrics.setUpcomingRides((int) rideRepository.countByRideStatus("UPCOMING"));
        dashboardMetrics.setCancelledRides((int) rideRepository.countByRideStatus("DRIVER_CANCELLED") +
                (int) rideRepository.countByRideStatus("RIDER_CANCELLED") + (int) rideRepository.countByRideStatus("ADMIN_CANCELLED"));

        dashboardMetrics = aggregateRevenue(dashboardMetrics);

        return dashboardMetrics;
    }

    private DashboardMetrics aggregateRevenue(DashboardMetrics dashboardMetrics){
        List<Payment> payment = new ArrayList<>();
        payment = paymentRepository.findByPaymentStatus("SUCCESSFUL");
        payment.forEach(payment1 -> {
            dashboardMetrics.setTotalRevenue(dashboardMetrics.getTotalRevenue() + payment1.getPayableAmount());
            dashboardMetrics.setAdminShare(dashboardMetrics.getAdminShare() + payment1.getAdminShare());
            dashboardMetrics.setDriverShare(dashboardMetrics.getDriverShare() + payment1.getDriverShare());
        });

        return dashboardMetrics;
    }
}
