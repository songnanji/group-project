package com.mysite.demo1.Review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private Long movieId;
    private String content;

    public ReviewDTO( Long movieId, String content) {
        this.movieId = movieId;
        this.content = content;
    }
}
