package com.mysite.demo1.post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(Long id) { //게시글 삭제
        postRepository.findById(id).ifPresentOrElse(
                postRepository::delete,
                () -> { throw new RuntimeException("삭제할 게시글이 존재하지 않습니다."); }
        );
    }

}
