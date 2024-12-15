package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProofOfIdentity {
    private String idNumber;
    private String idType;
    private String countryProvided;
}
