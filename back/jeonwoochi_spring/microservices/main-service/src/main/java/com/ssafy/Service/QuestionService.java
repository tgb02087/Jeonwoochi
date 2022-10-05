package com.ssafy.Service;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Entity.Question;
import com.ssafy.Domain.Repository.AnswerRepo;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Domain.Repository.QuestionRepo;
import com.ssafy.Dto.Request.QuestionRequest;
import com.ssafy.Dto.Response.AnswerResponse;
import com.ssafy.Dto.Response.QuestionResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.QUESTION_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepo questionRepo;
    private final AnswerRepo answerRepo;

    private final CategoryRepo categoryRepo;

    //질문 조회
    public List<QuestionResponse> findQuestion(){
        List<QuestionResponse> questionResponses = new ArrayList<>();
        List<Question> questions = questionRepo.findAll();
        questions.forEach(question -> {
            List<AnswerResponse> answerResponses = answerRepo.findByQuestion(question).stream()
                    .map(AnswerResponse::response)
                    .collect(Collectors.toList());
            questionResponses.add(QuestionResponse.response(question, answerResponses));
        });
        return questionResponses;
    }

    //질문 생성
    @Transactional
    public void createQuestion(QuestionRequest questionRequest){
        Question question = Question.create(questionRequest);
        questionRepo.save(question);
    }
}
