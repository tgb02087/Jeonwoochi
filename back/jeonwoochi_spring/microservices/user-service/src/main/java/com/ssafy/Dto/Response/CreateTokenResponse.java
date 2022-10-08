package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateTokenResponse {
    private String grantType;

    private String accessToken;

    public static CreateTokenResponse create(String AT){
        CreateTokenResponse accessTokenResponse = new CreateTokenResponse();
        accessTokenResponse.accessToken=AT;
        accessTokenResponse.grantType="Bearer";
        return accessTokenResponse;
    }
}
