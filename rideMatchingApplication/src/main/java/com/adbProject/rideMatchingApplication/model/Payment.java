package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Document(collection = "payments")
public class Payment implements Serializable {
    @Serial
    private static final long serialVersionUID = 766930616L;

    @Id
    private String paymentId;
    private String rideId;
    private String riderId;
    private String driverId;
    private String bookingId;
    private double driverShare;
    private double adminShare;
    private double payableAmount;
    private String paymentMethod;
    private String paymentStatus;
    private Date paymentDate;
}
