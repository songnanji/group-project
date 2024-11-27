package com.mysite.demo1;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    // 모든 영화 가져오기
    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
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


}