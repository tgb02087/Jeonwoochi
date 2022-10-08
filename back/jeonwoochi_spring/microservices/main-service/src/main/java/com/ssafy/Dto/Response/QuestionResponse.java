package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private Long questionId;

    private String question;

    private List<AnswerResponse> answerResponses;

    public static QuestionResponse response(Question question, List<AnswerResponse> answerResponses){
        return new QuestionResponse(
                question.getId(),
                question.getQuestion(),
                answerResponses
        );
    }
}
