package com.ssafy.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCreateRequest {

    private String kakao_id;

    private String google_id;

    private String name;

    private Enum gender;

    private int age;

    private String role;

    private Long state_type_id;
}
