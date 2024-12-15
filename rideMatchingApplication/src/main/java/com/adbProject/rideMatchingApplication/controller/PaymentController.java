package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Booking;
import com.adbProject.rideMatchingApplication.model.Payment;
import com.adbProject.rideMatchingApplication.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    PaymentRepository paymentRepository;

    @PostMapping
    public Payment createPayment(@RequestBody Payment payment){
        return paymentRepository.save(payment);
    }

    @GetMapping
    public List<Payment> getAllPayments(){
        return paymentRepository.findAll();
    }

    @PostMapping("/updateMultiplePayments")
    public List<Payment> updateMultiplePayments(@RequestBody List<Payment> payments){
        return paymentRepository.saveAll(payments);
    }

    @PutMapping("/updatePayment")
    public Payment updatePayment(@RequestBody Payment payment){
        List<Payment> existingPayments = paymentRepository.findByBookingIdAndPaymentStatus(payment.getBookingId(), "PENDING");
        if(existingPayments != null && !existingPayments.isEmpty()){
            List<Payment> filteredPayments = existingPayments.stream()
                    .filter(payment1 -> "PENDING".equals(payment1.getPaymentStatus())) // Filter payments with "PENDING" status
                    .collect(Collectors.toList()); // Collect the filtered stream into a list
            // Update paymentStatus for filteredPayments
            filteredPayments.forEach(payment2 -> payment2.setPaymentStatus("CANCELLED"));

            if(!filteredPayments.isEmpty()){
                paymentRepository.saveAll(filteredPayments);
            }
        }
        return paymentRepository.save(payment);
    }

    @PutMapping("/completePayment")
    public void completePayments(@RequestBody List<Booking> bookings){
        List<Payment> updatedPayments = new ArrayList<>();
        bookings.forEach(booking -> {
            List<Payment> existingPayments = paymentRepository.findByBookingIdAndPaymentStatus(booking.getBookingId(), "PENDING");
            if(existingPayments != null && !existingPayments.isEmpty()){
                List<Payment> filteredPayments = existingPayments.stream()
                        .filter(payment1 -> "PENDING".equals(payment1.getPaymentStatus())) // Filter payments with "PENDING" status
                        .collect(Collectors.toList()); // Collect the filtered stream into a list
                // Update paymentStatus for filteredPayments
                filteredPayments.forEach(payment2 -> payment2.setPaymentStatus("SUCCESSFUL"));

                if(!filteredPayments.isEmpty()){
                    paymentRepository.saveAll(filteredPayments);
                }
            }
        });

    }

    @GetMapping("/payment")
    public Optional<Payment> getPaymentById(@RequestParam(name = "id", required = true) String id){
        return paymentRepository.findById(id);
    }

    @GetMapping("/driverPayments")
    public List<Payment> getDriverPayments(@RequestParam(name = "driverId", required = true) String driverId){
        return paymentRepository.findByDriverId(driverId);
    }

    @GetMapping("/riderPayments")
    public List<Payment> getRiderPayments(@RequestParam(name = "riderId", required = true) String riderId){
        return paymentRepository.findByRiderId(riderId);
    }

    @GetMapping("/ridePayments")
    public List<Payment> getRidePayments(@RequestParam(name = "rideId", required = true) String rideId){
        return paymentRepository.findByRideId(rideId);
    }

    @GetMapping("/bookingPayments")
    public List<Payment> getBookingPayments(@RequestParam(name = "bookingId", required = true) String bookingId){
        return paymentRepository.findByBookingId(bookingId);
    }


}
