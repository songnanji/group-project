package com.mysite.demo1.comment;


import com.mysite.demo1.post.Post;
import com.mysite.demo1.post.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;


    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<?> addComment(@RequestBody Map<String, Object> requestData) {
        Long postId = ((Number) requestData.get("post_id")).longValue(); // post_id 추출
        String content = (String) requestData.get("content");
        System.out.println("Received JSON data: " + requestData);

        if (postId == null || content == null) {
            return ResponseEntity.badRequest().body("Post ID와 content는 필수입니다.");
        }
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        Comment comment = new Comment();
        comment.setPost(post);
        comment.setContent(content);
        Comment savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Map<String, Object> requestData) {
        String content = (String) requestData.get("content");
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Comment updatedComment = commentService.updateComment(id, content);
        return ResponseEntity.ok(updatedComment);
    }

}

