package com.example.wild.controller;

import com.example.wild.model.Details;
import com.example.wild.repository.DetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class DetailsController {

    @Autowired
    private DetailsRepository repo;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Details d) {
        Optional<Details> existing = repo.findByUsername(d.getUsername());
        if (existing.isPresent()) {
            return ResponseEntity.status(409).body("User already exists");
        }
        repo.save(d);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Details input) {
        Optional<Details> user = repo.findByUsernameAndPassword(input.getUsername(), input.getPassword());
        return user.<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(401).body("Invalid credentials"));
    }
}
