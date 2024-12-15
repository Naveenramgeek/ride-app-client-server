package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Document(collection = "drivers")
public class Driver implements Serializable {
    @Serial
    private static final long serialVersionUID = 882935037L;

    @Id
    private String userId;
    private double balance;
    private String licenseInfo;
    private List<Map<String, String>> vehicles;
    private double ratings;
    private BankDetails bankDetails;
}

