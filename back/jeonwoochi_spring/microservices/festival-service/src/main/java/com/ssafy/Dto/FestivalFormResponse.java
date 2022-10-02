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

    private Date startDate;

    private Date endDate;

    private String description;

    private String address;

    private String image;

    private String fee;

    public static FestivalFormResponse response(FestivalForm festivalForm){
        return new FestivalFormResponse(
                festivalForm.getId(),
                festivalForm.getFestivalName(),
                festivalForm.getStartDate(),
                festivalForm.getEndDate(),
                festivalForm.getDescription(),
                festivalForm.getAddress(),
                festivalForm.getImage(),
                festivalForm.getFee()
        );
    }
}
