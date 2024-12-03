package com.mysite.demo1.comment;


import com.mysite.demo1.post.Post;
import com.mysite.demo1.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    //private final CommentRepository commentRepository;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository; //

    public CommentService(CommentRepository commentRepository,PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public Comment saveComment(Comment comment) {
        Long postId = comment.getPost().getId();
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));
        comment.setPost(post);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found with id: " + postId));
        return commentRepository.findByPost(post);
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public Comment updateComment(Long id, String content) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("댓글을 찾을 수 없습니다."));
        comment.setContent(content);
        return commentRepository.save(comment);
    }

}
