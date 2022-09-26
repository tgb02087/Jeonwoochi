package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherResponse {

    private String fcstDate;

    private String fcstTime;

    private String category;

    private String fcstValue;

}
