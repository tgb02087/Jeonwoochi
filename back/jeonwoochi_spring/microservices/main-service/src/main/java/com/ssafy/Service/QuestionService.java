package com.ssafy.Service;

import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Entity.Question;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Domain.Repository.QuestionRepo;
import com.ssafy.Dto.Request.QuestionRequest;
import com.ssafy.Dto.Response.QuestionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepo questionRepo;

    private final CategoryRepo categoryRepo;

    //질문 조회
    public QuestionResponse findQuestion(Long questionId){
        Question question = questionRepo.findOne(questionId);
        return QuestionResponse.create(question);
    }

    //질문 생성
    @Transactional
    public String createQuestion(QuestionRequest questionRequest){
        try {
            Category category = categoryRepo.findOne(questionRequest.getCategoryId());
            System.out.println("category = " + category.getName());
            Question question = Question.create(questionRequest, category);
            System.out.println("question = " + question.getQuestion());
            questionRepo.save(question);
            return "성공";
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "실패";
    }
}
