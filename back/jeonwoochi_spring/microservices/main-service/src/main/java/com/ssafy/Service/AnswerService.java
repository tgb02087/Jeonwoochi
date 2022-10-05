package com.ssafy.Service;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Entity.Question;
import com.ssafy.Domain.Repository.AnswerRepo;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Domain.Repository.QuestionRepo;
import com.ssafy.Dto.Request.AnswerRequest;
import com.ssafy.Dto.Response.AnswerResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.exception.NotFoundException.QUESTION_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AnswerService {

    private final AnswerRepo answerRepo;
    private final QuestionRepo questionRepo;
    private final CategoryRepo categoryRepo;

    //답변 조회
//    public AnswerResponse findAnswer(Long answerId){
//        Answer answer = answerRepo.findOne(answerId);
//        return AnswerResponse.create(answer);
//    }

    //답변 생성
    @Transactional
    public void createAnswer(AnswerRequest answerRequest){
            Question question = questionRepo.findById(answerRequest.getQuestionId())
                    .orElseThrow(()->new NotFoundException(QUESTION_NOT_FOUND));
            Answer answer = Answer.create(answerRequest, question);
            answerRepo.save(answer);
    }

}
