package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReJwtTokenResponse {

    private String accesstoken;

    private String refreshtoken;

    private Boolean isRT; //true: RT 재발급 완료
}
