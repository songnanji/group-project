package com.mysite.demo1.answer;

import com.mysite.demo1.question.Question;
import com.mysite.demo1.question.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;


@RequestMapping("/answer")
@RequiredArgsConstructor
@Controller
public class AnswerController { //2-12 답변 기능 만들기 -> AnswerService를 만들어 답변 저장. (클라->컨트롤러->서비스)

    private final QuestionService questionService;
    private final AnswerService answerService;

    @PostMapping("/create/{id}")
    public String createAnswer(Model model, @PathVariable("id") Integer id, @Valid AnswerForm answerForm, BindingResult bindingResult) {
        Question question = this.questionService.getQuestion(id);
        if (bindingResult.hasErrors()) {
            model.addAttribute("question", question);
            return "question_detail";
        }
        // TODO: 답변을 저장한다.
        this.answerService.create(question,  answerForm.getContent());

        return String.format("redirect:/question/detail/%s", id);
    }
}
