package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Type.FestivalWayType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalFormUpdateRequest {
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

    private Long festivalTypeId;
}
