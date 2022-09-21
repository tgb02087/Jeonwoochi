package com.ssafy.config.LoginUser;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class User {

    private Long id;

    private String kakao_id;

    private String google_id;

    private String name;

    private String gender;

    private int age;

    private String role;

    private StatusType statusType;

}
