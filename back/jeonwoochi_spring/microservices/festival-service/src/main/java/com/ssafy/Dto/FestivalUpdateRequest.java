package com.ssafy.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalUpdateRequest {

    private Long id;

    private String name;

    private Date startDate;

    private Date finishDate;

    private String contents;

    private String locate;

    private String image;

    private Double lat;

    private Double lng;

    private Long festivalTypeId;
}
