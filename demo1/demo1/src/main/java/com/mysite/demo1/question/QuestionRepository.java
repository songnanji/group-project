package com.mysite.demo1.question;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    Question findBySubject(String subject);
    Question findBySubjectAndContent(String subject, String content);
    Question findBySubjectLike(String subject);

    Page<Question> findAll(Pageable pageable);

}
