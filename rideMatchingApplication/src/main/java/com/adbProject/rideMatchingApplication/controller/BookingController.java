package com.adbProject.rideMatchingApplication.controller;

import com.adbProject.rideMatchingApplication.model.Booking;
import com.adbProject.rideMatchingApplication.model.Ride;
import com.adbProject.rideMatchingApplication.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> bookRide(
            @RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.bookRide(booking));
    }

    @GetMapping
    public List<Booking> getBookings() {
        return bookingService.getBookings();
    }

    @GetMapping("/booking")
    public Booking getBookingById(@RequestParam(name = "id", required = true) String id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/rider")
    public List<Booking> getBookingsByRiderId(@RequestParam(name = "riderId", required = true) String riderId) {
        return bookingService.getBookingsByRiderId(riderId);
    }

    @GetMapping("/ride")
    public List<Booking> getBookingsByRideId(@RequestParam(name = "rideId", required = true) String rideId) {
        return bookingService.getBookingsByRideId(rideId);
    }

    @PutMapping("/update")
    public Booking updateBooking(@RequestBody Booking updatedBooking) {
        //send mail about ride update,
        //update ride
        return bookingService.bookingUpdate(updatedBooking);
    }

    @PostMapping("/saveALlBookings")
    public List<Booking> saveAllBookings(@RequestBody List<Booking> updatedBooking) {
        //send mail about ride update,
        //update ride
        return bookingService.updateAllBookings(updatedBooking);
    }

    @PutMapping("/cancel")
    public Booking cancelBookingById(@RequestBody Booking booking) {
        //cancel bookings by rideId
        //send mail regarding canceling the ride

        return bookingService.cancelBooking(booking);
    }
}
