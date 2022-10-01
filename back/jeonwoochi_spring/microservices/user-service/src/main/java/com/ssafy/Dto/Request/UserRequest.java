package com.ssafy.Dto.Request;

import com.ssafy.Domain.Entity.StatusType;
import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {

    private String kakao_id;

    private String google_id;

    private String name;

    private GenderType gender;

    private int age;

    private RoleType role;

    private StatusType state_type_id;

    private Boolean is_dummy;
}
