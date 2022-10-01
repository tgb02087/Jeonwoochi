package com.ssafy.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InterestUpdateRequest {
    private Long interestId;

    private Long userId;

    private Long answerId;
}
