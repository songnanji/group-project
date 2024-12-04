package com.mysite.demo1.Like;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/likes")
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/{movieId}")
    public ResponseEntity<Void> addLike(@PathVariable Long movieId) {
        likeService.addLike(movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Integer> getLikes(@PathVariable Long movieId) {
        int likes = likeService.getLikes(movieId);
        return ResponseEntity.ok(likes);
    }
}
