package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Type.GenderType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReponse {

    //kakaoId
    private String id;

    private String name;

    private GenderType gender;

    private int age;

    private String AT;
}
