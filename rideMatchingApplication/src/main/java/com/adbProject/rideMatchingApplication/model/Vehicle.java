package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Document(collection = "vehicles")
public class Vehicle implements Serializable {
    @Serial
    private static final long serialVersionUID = 203669204L;

    @Id
    private String vehicleNo;
    private String driverID;
    private String vehicleModel;
    private String color;
    private Double ratings;
    private int year;
    private int seating;
    private String image;
}
