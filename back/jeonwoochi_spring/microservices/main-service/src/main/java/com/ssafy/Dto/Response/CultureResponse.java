package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Culture;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CultureResponse {
    private Long id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    public static CultureResponse response(Culture culture){
        CultureResponse cultureResponse = new CultureResponse();
        cultureResponse.id = culture.getId();
        cultureResponse.name = culture.getName();
        cultureResponse.address = culture.getAddress();
        cultureResponse.lat = culture.getLat();
        cultureResponse.lng = culture.getLng();
        return cultureResponse;
    }
}
