package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Festival;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalResponse {

    private Long id;

    private String festivalName;

    private String startDate;

    private String endDate;

    private String description;

    private String address;

    private String image;

    private Double lat;

    private Double lng;

    private String fee;

    private String homepage;
    public static FestivalResponse response(Festival festival){
        return new FestivalResponse(
                festival.getId(),
                festival.getFestivalName(),
                new SimpleDateFormat("yyyy-MM-dd").format(festival.getStartDate()),
                new SimpleDateFormat("yyyy-MM-dd").format(festival.getEndDate()),
                festival.getDescription(),
                festival.getAddress(),
                festival.getImage(),
                festival.getLat(),
                festival.getLng(),
                festival.getFee(),
                festival.getHomepage()
        );
    }
}
