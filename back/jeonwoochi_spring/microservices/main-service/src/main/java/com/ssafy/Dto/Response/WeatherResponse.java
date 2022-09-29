package com.ssafy.Dto.Response;

import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {

    private String fcstDate;

    private String fcstTime;

    private String SKY;

    private String TMP;

    private String PTY;

    private String TMN;

    private String TMX;

    public WeatherResponse(String fcstDate, String fcstTime){
        this.fcstDate = fcstDate;
        this.fcstTime = fcstTime;
    }

}
