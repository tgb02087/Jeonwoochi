package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Festival;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalResponse {

    private Long id;

    private String festivalName;

    private Date startDate;

    private Date endDate;

    private String description;

    private String address;

    private String image;

    private Double lat;

    private Double lng;

    private String fee;

    public static FestivalResponse response(Festival festival){
        return new FestivalResponse(
                festival.getId(),
                festival.getFestivalName(),
                festival.getStartDate(),
                festival.getEndDate(),
                festival.getDescription(),
                festival.getAddress(),
                festival.getImage(),
                festival.getLat(),
                festival.getLng(),
                festival.getFee()
        );
    }
}
