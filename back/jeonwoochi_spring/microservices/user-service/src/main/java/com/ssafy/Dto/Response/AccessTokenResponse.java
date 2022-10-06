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

    private Boolean isAlreadyJoined;

    public static AccessTokenResponse create(String AT, Boolean isAlreadyJoined){
        AccessTokenResponse accessTokenResponse = new AccessTokenResponse();
        accessTokenResponse.accessToken=AT;
        accessTokenResponse.grantType="Bearer";
        accessTokenResponse.isAlreadyJoined=isAlreadyJoined;
        return accessTokenResponse;
    }
}
