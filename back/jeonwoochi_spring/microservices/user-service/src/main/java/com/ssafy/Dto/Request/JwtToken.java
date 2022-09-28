package com.ssafy.Dto.Request;

import lombok.Data;

// 일회성 토큰을 받은 후, 해당 일회성 토큰을 가지고 AccessToken을 얻기 위한 Request VO
@Data
public class JwtToken {
    private String JwtToken;
}
