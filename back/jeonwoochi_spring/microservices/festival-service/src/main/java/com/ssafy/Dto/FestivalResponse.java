package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Type.FestivalWayType;
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

    private Date startDate;

    private Date finishDate;

    private String contents;

    private String locate;

    private String image;

    private FestivalWayType way;

    private Long x;

    private Long y;

    private Float lat;

    private Float lng;

    public static FestivalResponse response(Festival festival){
        return new FestivalResponse(
                festival.getId(),
                festival.getName(),
                festival.getStartDate(),
                festival.getFinishDate(),
                festival.getContents(),
                festival.getLocate(),
                festival.getImage(),
                festival.getWay(),
                festival.getX(),
                festival.getY(),
                festival.getLat(),
                festival.getLng()
        );
    }
}
