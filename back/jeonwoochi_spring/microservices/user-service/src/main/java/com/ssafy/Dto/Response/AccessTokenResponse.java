package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccessTokenResponse {
    private String grantType;

    private String accessToken;

    public static AccessTokenResponse create(String AT){
        AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
        accessTokenResponse.accessToken=AT;
        accessTokenResponse.grantType="Bearer";
        return accessTokenResponse;
    }
}
