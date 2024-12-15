package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.dto.AuthResponse;
import com.adbProject.rideMatchingApplication.dto.UserLoginRequest;
import com.adbProject.rideMatchingApplication.exception.UnauthorizedException;
import com.adbProject.rideMatchingApplication.model.Driver;
import com.adbProject.rideMatchingApplication.model.User;
import com.adbProject.rideMatchingApplication.service.AuthService;
import com.adbProject.rideMatchingApplication.repository.UserRepository;
import com.adbProject.rideMatchingApplication.service.EmailService;
import com.adbProject.rideMatchingApplication.service.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    EmailService emailService;

    @Value("${file.upload-dir}") // Define upload directory in application.properties
    private String uploadDir;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody UserLoginRequest user) {
        Optional<User> optionalUser = userRepository.findByEmailAndRole(user.getEmail(), user.getRole());
        if (optionalUser.isPresent() && user.getPassword().equals(optionalUser.get().getPassword()) && user.getRole().equals(optionalUser.get().getRole())) {
            User validUser = optionalUser.get();
            String token = jwtUtil.generateToken(validUser.getEmail(), validUser.getRole(), 3600000);
            return ResponseEntity.ok(new AuthResponse(token));
        }
        throw new RuntimeException("Invalid credentials");
    }

    @GetMapping("/updatePassword")
    public void updatePassword(@RequestParam(name = "email", required = true) String email, @RequestParam(name = "password", required = true) String password){
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent() ) {
            User validUser = optionalUser.get();
            validUser.setPassword(password);
            userRepository.save(validUser);
        }
    }

    @PutMapping("/update")
    public User updateUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) throws UnauthorizedException {
        Optional<User> optionalUser = userRepository.findByEmailAndRole(user.getEmail(), user.getRole());
        if (optionalUser.isPresent()  && user.getRole().equals(optionalUser.get().getRole())) {
            return ResponseEntity.badRequest().body("User already exists");
        }
        return ResponseEntity.ok(authService.saveUser(user));
    }

    @PostMapping("/upload-profile-picture/{userId}")
    public String uploadProfilePicture(@PathVariable String userId, @RequestParam("file") MultipartFile file) {
        try {
            Optional<User> user = userRepository.findById(userId);
            // Generate a unique file name
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Save the file to the upload directory
            Path filePath = Paths.get(uploadDir, fileName);
            Files.createDirectories(filePath.getParent());
            Files.write(filePath, file.getBytes());

            // Construct the file URL (e.g., http://localhost:8080/uploads/filename)
            String fileUrl = "/uploads/" + fileName;

            // Update user in MongoDB
            // User user = userService.getUserById(userId); (fetch user from DB)
            // user.setProfilePictureUrl(fileUrl);
            // userService.save(user);
            if(user !=null){
                User user1 = user.get();
                user1.setProfilePictureUrl(fileUrl);
                authService.saveUser(user1);
            }
            return fileUrl; // Return the file URL
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public Optional<User> getUserById(@RequestParam(name = "id", required = true) String id) {
        return userRepository.findById(id);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/usersByIds")
    public List<User> getUsersByIds(@RequestParam List<String> ids) {
        return userRepository.findAllById(ids);
    }

    @DeleteMapping("/deleteUser")
    public void deleteUsersByIds(@RequestParam String id) {
         userRepository.deleteById(id);
    }

    @GetMapping("/sendSecurityCode")
    public ResponseEntity<?> sendEmail(@RequestParam(name = "email", required = true) String email){
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        String securityCode = String.valueOf(code);
        this.emailService.sendEmail(email, "Security code to reset your Password", securityCode);
        return ResponseEntity.ok(new AuthResponse(securityCode));
    }
}
