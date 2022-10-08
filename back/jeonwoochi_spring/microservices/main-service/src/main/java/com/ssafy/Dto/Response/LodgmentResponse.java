package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Lodgment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LodgmentResponse {
    private Long id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    public static LodgmentResponse response(Lodgment lodgment){
        LodgmentResponse lodgmentResponse = new LodgmentResponse();
        lodgmentResponse.id = lodgment.getId();
        lodgmentResponse.name = lodgment.getName();
        lodgmentResponse.address = lodgment.getAddress();
        lodgmentResponse.lat = lodgment.getLat();
        lodgmentResponse.lng = lodgment.getLng();
        return lodgmentResponse;
    }
}
