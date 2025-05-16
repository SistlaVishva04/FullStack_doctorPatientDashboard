package com.example.wild.repository;

import com.example.wild.model.Details;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DetailsRepository extends JpaRepository<Details, String> {
    Optional<Details> findByUsername(String username);
    Optional<Details> findByUsernameAndPassword(String username, String password);
}
