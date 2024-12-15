package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentDetails {
    private Long cardNumber;
    private String expiryDate;
    private int securityCode;
    private String cardHolderName;
}
