package com.adbProject.rideMatchingApplication.repository;

import com.adbProject.rideMatchingApplication.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, String role);
}
