package com.adbProject.rideMatchingApplication.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Document(collection = "users")
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 627010245L;

    @Id
    private String userId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role; // "ADMIN", "DRIVER", or "RIDER"
    private Long phone;
    private String address;
    private ProofOfIdentity proofOfIdentity;
    private Long tokenExpiry;
    private String profilePictureUrl;
}
