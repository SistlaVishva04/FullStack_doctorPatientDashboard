package com.example.wild.repository;

import com.example.wild.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByDoctorUsername(String username);
    List<Blog> findByCategoryAndDraftFalse(String category);
}
