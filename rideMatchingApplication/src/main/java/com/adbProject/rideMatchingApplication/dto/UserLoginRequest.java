package com.adbProject.rideMatchingApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginRequest {
    private String email;
    private String password;
    private String role;
}
