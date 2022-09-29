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

    private String name;

    private String festivalType;

    private Date startDate;

    private Date finishDate;

    private String contents;

    private String locate;

    private String image;

    private Double lat;

    private Double lng;

    public static FestivalResponse response(Festival festival){
        return new FestivalResponse(
                festival.getId(),
                festival.getName(),
                festival.getFestivalType().getName(),
                festival.getStartDate(),
                festival.getFinishDate(),
                festival.getContents(),
                festival.getLocate(),
                festival.getImage(),
                festival.getLat(),
                festival.getLng()
        );
    }
}
