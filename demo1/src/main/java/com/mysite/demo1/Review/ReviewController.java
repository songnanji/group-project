package com.mysite.demo1.Review;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReviewController {
    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping("/api/reviews")
    public ResponseEntity<Review> createReview(@RequestBody ReviewDTO reviewDTO) {
        System.out.println("Review received: " + reviewDTO.getMovieId() + ", " + reviewDTO.getContent());
        Review review = new Review(reviewDTO.getMovieId(), reviewDTO.getContent());
        return ResponseEntity.ok(reviewService.saveReview(review));
    }

    @GetMapping("/api/reviews/movie/{movieId}")
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable Long movieId) {
        List<Review> reviews = reviewService.getReviewsByMovieId(movieId);
        return ResponseEntity.ok(reviews);
    }
}