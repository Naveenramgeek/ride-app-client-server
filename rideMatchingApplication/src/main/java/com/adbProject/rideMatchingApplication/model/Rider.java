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
@Document(collection = "riders")
public class Rider implements Serializable {
    @Serial
    private static final long serialVersionUID = 372040353L;

    @Id
    private String userId;
    private List<String> bookings; // Booking IDs
    private PaymentDetails cardDetails;
}

