package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Document(collection = "bookings")
public class Booking implements Serializable {
    @Serial
    private static final long serialVersionUID = 627010235L;

    @Id
    private String bookingId;
    private String riderId;
    private String rideId;
    private int seatsBooked;
    private List<Passenger> passengers;
    private double totalPrice;
    private String bookingStatus;
}

