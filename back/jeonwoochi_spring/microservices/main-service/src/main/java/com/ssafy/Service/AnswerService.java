package com.ssafy.Service;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Repository.AnswerRepo;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Dto.Request.AnswerRequest;
import com.ssafy.Dto.Response.AnswerResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnswerService {

    private final AnswerRepo answerRepo;

    private final CategoryRepo categoryRepo;

    //답변 조회
    public AnswerResponse findAnswer(Long answerId){
        Answer answer = answerRepo.findOne(answerId);
        return AnswerResponse.create(answer);
    }

    //답변 생성
    @Transactional
    public String createAnswer(AnswerRequest answerRequest){
        try {
            Category category = categoryRepo.findOne(answerRequest.getCategoryId());
            Answer answer = Answer.create(answerRequest,category);
            answerRepo.save(answer);
            return "성공";
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "실패";
    }

}
