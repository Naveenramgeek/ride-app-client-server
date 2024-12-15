package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Document(collection = "rides")
public class Ride implements Serializable {
    @Serial
    private static final long serialVersionUID = 45937437L;

    @Id
    private String rideId;
    private String driverId;
    private Map<String, String> vehicle;
    private String pickupLocation;
    private String dropLocation;
    private Date date;
    private Date estimatedDate;
    private double pricePerPassenger;
    private int totalSeats;
    private int availableSeats;
    private String rideStatus;
    private List<RatingsFeedBack> ratingsFeedback;
}

