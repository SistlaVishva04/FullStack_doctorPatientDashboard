package com.example.wild.controller;

import com.example.wild.model.Blog;
import com.example.wild.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepo;

    @PostMapping("/create")
    public Blog createBlog(@RequestBody Blog blog) {
        return blogRepo.save(blog);
    }

    @GetMapping("/doctor/{username}")
    public List<Blog> getDoctorBlogs(@PathVariable String username) {
        return blogRepo.findByDoctorUsername(username);
    }

    @GetMapping("/category/{category}")
    public List<Blog> getBlogsByCategory(@PathVariable String category) {
        return blogRepo.findByCategoryAndDraftFalse(category);
    }

    @GetMapping
    public List<Blog> getAllBlogs() {
        return blogRepo.findAll();
    }
}
