package com.mysite.demo1.Review;


import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;


    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review saveReview(Review review) {
       return reviewRepository.save(review);
    }

    public List<Review> getReviewsByMovieId(Long movieId) {
        return reviewRepository.findByMovieId(movieId);
    }
}
