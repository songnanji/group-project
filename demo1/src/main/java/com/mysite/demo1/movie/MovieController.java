package com.mysite.demo1.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // 모든 영화 가져오기
    @GetMapping("api/movies")
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }


    //공유하기(url 주소로 영화 가져오기)
    @GetMapping("api/movies/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 검색 경로 수정
//    @GetMapping("api/movies/search")
//    public List<Movie> searchMovies(@RequestParam("title") String title) {
//        System.out.println("Searching for title: " + title);
//        return movieRepository.findByTitleContainingIgnoreCase(title);
//    }

    @GetMapping("api/movies/search")
    public List<Movie> searchMovies(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "genre", required = false) String genre) {

        // 장르 검색
        if (genre != null && !genre.isEmpty()) {
            return movieRepository.findByGenresContainingIgnoreCase(genre);
        } else if (title != null && !title.isEmpty()) {
            return movieRepository.findByTitleContainingIgnoreCase(title);
        }else{
            return movieRepository.findAll();        // 조건이 없을 경우 모든 영화 반환

        }


    }
    //랜덤영화
    @GetMapping("/api/movies/random")
    public List<Movie> getRandomMovies() {
        List<Movie> allMovies = movieRepository.findAll();
        Collections.shuffle(allMovies);
        return allMovies.stream().limit(5).collect(Collectors.toList());
    }



}