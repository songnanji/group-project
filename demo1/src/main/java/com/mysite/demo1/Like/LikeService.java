package com.mysite.demo1.Like;
import com.mysite.demo1.movie.Movie;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Transactional
    public void addLike(Long movieId) {
        likeRepository.incrementLikes(movieId);
    }

    public int getLikes(Long movieId) {
        return likeRepository.findById(movieId)
                .map(Movie::getLike)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
    }
}
