package com.ssafy.Dto.Request;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfoRequest {

    private Long id;

    private GenderType gender;

    private int age;

    private RoleType role;

    private String kakaoToken;

}
