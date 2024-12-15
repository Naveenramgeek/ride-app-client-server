package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BankDetails {
    private String recipientName;
    private Long accountNumber;
    private String routingNumber;
}
