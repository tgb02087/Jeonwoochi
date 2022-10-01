package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerResponse {

    private Long answerId;

    private String answer;

    private Long categoryId;

    public static AnswerResponse create(Answer answer){
        return new AnswerResponse(
                answer.getId(),
                answer.getAnswer(),
                answer.getCategory().getId()
        );
    }
}
