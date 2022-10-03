package com.ssafy.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalFormUpdateRequest {
    private Long id;

    private String festivalName;

    private Date startDate;

    private Date endDate;

    private String description;

    private String address;

    private String image;

    private String fee;

    private String homepage;
}
