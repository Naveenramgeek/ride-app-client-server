package com.adbProject.rideMatchingApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF Configuration
                .csrf(AbstractHttpConfigurer::disable)

                // Authorization Rules
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/auth/signup").permitAll()
                        .requestMatchers("/drivers/**").permitAll()
                        .requestMatchers("/riders/**").permitAll()
                        .requestMatchers("/rides/**").permitAll()
                        .requestMatchers("/bookings/**").permitAll()
                        .requestMatchers("/payments/**").permitAll()
                        .requestMatchers("/vehicles/**").permitAll()
                        .requestMatchers("/uploads/**").permitAll()
                        .requestMatchers("/admin/**").permitAll()
                        .anyRequest().authenticated()
                )

                // Session Management
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


