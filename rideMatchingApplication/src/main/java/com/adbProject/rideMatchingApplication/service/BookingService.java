package com.adbProject.rideMatchingApplication.service;

import com.adbProject.rideMatchingApplication.model.Booking;
import com.adbProject.rideMatchingApplication.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RideService rideService;

    public Booking bookRide(Booking booking) {

        rideService.updateAvailableSeats(booking.getRideId(), booking.getSeatsBooked(), booking.getBookingStatus());

        return bookingRepository.save(booking);
    }

    public List<Booking> updateAllBookings(List<Booking> bookings){
        return bookingRepository.saveAll(bookings);
    }

    public Booking bookingUpdate(Booking booking) {
        Optional<Booking> booking1 = bookingRepository.findById(booking.getBookingId());
        int difference = booking1.get().getSeatsBooked() - booking.getSeatsBooked();
        if(difference != 0){
            rideService.updateAvailableSeatsWhenBookingUpdate(booking.getRideId(), difference);
        }
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Booking booking){
        rideService.updateAvailableSeatsWhenBookingUpdate(booking.getRideId(), booking.getSeatsBooked());
        return bookingRepository.save(booking);
    }

    public List<Booking> getBookingsByRiderId(String riderId) {
        return bookingRepository.findByRiderId(riderId);
    }

    public List<Booking> getBookingsByRideId(String rideId) {
        return bookingRepository.findByRideId(rideId);
    }

    public Booking getBookingById(String id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ride not found"));
    }

    public List<Booking> getBookings() {
        return bookingRepository.findAll();
    }
}

