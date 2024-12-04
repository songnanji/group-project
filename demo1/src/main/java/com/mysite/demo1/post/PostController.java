package com.mysite.demo1.post;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//게시판 불러오기o, 글쓰기o, 글수정x,글삭제d
@RestController
@RequestMapping("/api/board")
public class PostController {
    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping()
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @PostMapping()
    public ResponseEntity<?> createPost(@RequestBody Post post) {
        if (post.getAuthor() == null || post.getAuthor().isEmpty()) {
            return ResponseEntity.badRequest().body("작성자는 필수 항목입니다.");
        }
        if (post.getTitle() == null || post.getTitle().isEmpty()) {
            return ResponseEntity.badRequest().body("제목은 필수 항목입니다.");
        }
        if (post.getContent() == null || post.getContent().isEmpty()) {
            return ResponseEntity.badRequest().body("내용은 필수 항목입니다.");
        }

        Post savedPost = postService.savePost(post);
        return ResponseEntity.ok(savedPost);
    }

    @PutMapping("/{id}") //게시글 업데이트
    public ResponseEntity<?> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
        try {
            Post post = postService.updatePost(id, updatedPost);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}") //게시글 삭제
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok().body("게시글이 삭제되었습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
