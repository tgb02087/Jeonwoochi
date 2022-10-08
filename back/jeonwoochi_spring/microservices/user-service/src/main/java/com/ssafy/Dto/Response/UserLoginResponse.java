package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Entity.Type.StateType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginResponse {
    private Long id;

    private String kakao_id;

    private String google_id;

    private String name;

    private GenderType gender;

    private int age;

    private RoleType role;

    private StateType stateType;

    private Boolean is_dummy;

    private Boolean isAlreadyJoined;
}
