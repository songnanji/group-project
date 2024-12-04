package com.mysite.demo1.movie;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "movies3") // 테이블 이름을 movies3으로 변경

public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title") // 테이블의 컬럼 이름이 title인 경우
    private String title;

    @Column(name = "year")
    private int year;

    @Column(name = "rating")
    private double rating;

    @Column(name = "runtime")
    private int runtime;

    @Column(name = "genres")
    private String genres;

    @Column(name = "director")
    private String director;

    @Column(name = "description_intro")
    private String descriptionIntro;

    @Column(name = "large_cover_image")
    private String large_cover_image;

    //좋아요 기능에서 활용.
    @Column(name = "likes", nullable = false, columnDefinition = "INT DEFAULT 0")
    private int likes;

    // Getter and Setter
    public int getLike() {
        return likes;
    }

    public void setLike(int likes) {
        this.likes = likes;
    }

    // Getter and Setter
    public String getLargeCoverImage() {
        return large_cover_image;
    }

    public void setLargeCoverImage(String large_cover_image) {
        this.large_cover_image = large_cover_image;
    }
}
