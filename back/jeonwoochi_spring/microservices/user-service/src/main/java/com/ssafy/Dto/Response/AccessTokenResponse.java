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

    private Boolean isUser;

    public static AccessTokenResponse create(String AT, Boolean isuser){
        AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
        accessTokenResponse.accessToken=AT;
        accessTokenResponse.grantType="Bearer";
        accessTokenResponse.isUser=isuser;
        return accessTokenResponse;
    }
}
