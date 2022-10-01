package com.ssafy.Dto;

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

    private String festivalName;

    private String festivalType;

    private Date startDate;

    private Date endDate;

    private String description;

    private String address;

    private String image;

    public static FestivalFormResponse response(FestivalForm festivalForm){
        return new FestivalFormResponse(
                festivalForm.getId(),
                festivalForm.getFestivalName(),
                festivalForm.getFestivalType().getName(),
                festivalForm.getStartDate(),
                festivalForm.getEndDate(),
                festivalForm.getDescription(),
                festivalForm.getAddress(),
                festivalForm.getImage()
        );
    }
}
