package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Interest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterestResponse {

    private Long interestId;

    private Long userId;

    private Long answerId;

    public static InterestResponse create(Interest interest){
        return new InterestResponse(
                interest.getId(),
                interest.getUserId(),
                interest.getAnswer().getId()
        );
    }
}
