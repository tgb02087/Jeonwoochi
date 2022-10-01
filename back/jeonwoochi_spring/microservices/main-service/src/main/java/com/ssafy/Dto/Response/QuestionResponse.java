package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {

    private Long questionId;

    private String question;

    private Long categoryId;

    public static QuestionResponse create(Question question){
        return new QuestionResponse(
                question.getId(),
                question.getQuestion(),
                question.getCategory().getId()
        );
    }
}
