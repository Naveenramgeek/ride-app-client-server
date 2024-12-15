package com.adbProject.rideMatchingApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackages = "com.adbProject.rideMatchingApplication.repository")
@SpringBootApplication
public class RideMatchingApplication {

	public static void main(String[] args) {
		SpringApplication.run(RideMatchingApplication.class, args);
	}

}
