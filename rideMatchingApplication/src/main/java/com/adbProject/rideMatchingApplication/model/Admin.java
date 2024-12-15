package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Document(collection = "admin")
public class Admin implements Serializable {

    @Serial
    private static final long serialVersionUID = 627450245L;

    @Id
    private String adminId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role; // "ADMIN", "DRIVER", or "RIDER"
    private Long phone;
    private int earnings;
}
