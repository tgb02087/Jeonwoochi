package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CheckUserResponse {

    private Long id;

    // true = 관리자 , false = 유저
    private Boolean isAdmin;
}
