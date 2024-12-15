package com.adbProject.rideMatchingApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardMetrics {

    private int totalUsers;
    private int totalDrivers;
    private int totalRiders;
    private int successfulRides;
    private int cancelledRides;
    private int upcomingRides;
    private double totalRevenue;
    private double adminShare;
    private double driverShare;
}
