package com.mysite.demo1.Like;

import com.mysite.demo1.movie.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Movie, Long> {
    @Query("UPDATE Movie m SET m.likes = m.likes + 1 WHERE m.id = :id")
    @Modifying
    void incrementLikes(@Param("id") Long id);

}
