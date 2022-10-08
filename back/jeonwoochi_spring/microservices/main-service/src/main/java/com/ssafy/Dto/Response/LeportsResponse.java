package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Leports;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeportsResponse {
    private Long id;

    private String name;

    private String address;

    private Double lat;

    private Double lng;

    public static LeportsResponse response(Leports leports){
        LeportsResponse leportsResponse = new LeportsResponse();
        leportsResponse.id = leports.getId();
        leportsResponse.name = leports.getName();
        leportsResponse.address = leports.getAddress();
        leportsResponse.lat = leports.getLat();
        leportsResponse.lng = leports.getLng();
        return leportsResponse;
    }
}
