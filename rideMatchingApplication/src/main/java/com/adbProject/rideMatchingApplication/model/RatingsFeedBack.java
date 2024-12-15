package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingsFeedBack {
    private String riderId;
    private double ratings;
    private String feedback;
    private String response;
}
