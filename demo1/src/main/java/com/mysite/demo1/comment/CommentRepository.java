package com.mysite.demo1.comment;


import com.mysite.demo1.post.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post); // Use Post entity instead of Long postId
}
