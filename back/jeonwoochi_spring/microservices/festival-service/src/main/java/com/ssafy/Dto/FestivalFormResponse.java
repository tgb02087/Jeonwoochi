package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Type.FestivalWayType;
import com.ssafy.Domain.Entity.FestivalForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalFormResponse {

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

    public static FestivalFormResponse response(FestivalForm festivalForm){
        return new FestivalFormResponse(
                festivalForm.getId(),
                festivalForm.getName(),
                festivalForm.getStartDate(),
                festivalForm.getFinishDate(),
                festivalForm.getContents(),
                festivalForm.getLocate(),
                festivalForm.getImage(),
                festivalForm.getWay(),
                festivalForm.getX(),
                festivalForm.getY(),
                festivalForm.getLat(),
                festivalForm.getLng()
        );
    }
}
