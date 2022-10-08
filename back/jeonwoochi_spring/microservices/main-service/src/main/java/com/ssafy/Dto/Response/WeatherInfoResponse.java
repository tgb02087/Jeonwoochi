package com.ssafy.Dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherInfoResponse {
    private String data;

    private String sky;

    private String tmx;

    private String tmn;
}
