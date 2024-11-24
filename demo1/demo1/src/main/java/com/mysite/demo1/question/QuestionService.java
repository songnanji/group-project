package com.mysite.demo1.question;

import com.mysite.demo1.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import org.springframework.data.domain.Sort;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public List<Question> getList(){
        return this.questionRepository.findAll();
    }

    public Question getQuestion(Integer id){
        Optional<Question> question = this.questionRepository.findById(id);
        if(question.isPresent()) {
            return question.get();
        }else{
            throw new DataNotFoundException("question not found");
        }
    }

    public Page<Question> getList(int page) {
        List<Sort.Order> sorts = new ArrayList<>();
        sorts.add(Sort.Order.asc("createDate"));
        Pageable pageable = PageRequest.of(page, 10,Sort.by(sorts));//(보여줄 페이지번호, 보여줄 게시물 갯수)
        return this.questionRepository.findAll(pageable);
    }

    public void create(String subject, String content) {
        Question q = new Question();
        q.setSubject(subject);
        q.setContent(content);
        q.setCreateDate(LocalDateTime.now());
        this.questionRepository.save(q);
    }
}
