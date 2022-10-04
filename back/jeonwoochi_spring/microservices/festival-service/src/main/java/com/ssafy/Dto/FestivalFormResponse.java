package com.ssafy.Dto;

import com.ssafy.Domain.Entity.FestivalForm;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalFormResponse {

    private Long id;

    private String festivalName;

    private String startDate;

    private String endDate;

    private String description;

    private String address;

    private String image;

    private String fee;

    private String homepage;
    public static FestivalFormResponse response(FestivalForm festivalForm){
        return new FestivalFormResponse(
                festivalForm.getId(),
                festivalForm.getFestivalName(),
                new SimpleDateFormat("yyyy-MM-dd").format(festivalForm.getStartDate()),
                new SimpleDateFormat("yyyy-MM-dd").format(festivalForm.getEndDate()),
                festivalForm.getDescription(),
                festivalForm.getAddress(),
                festivalForm.getImage(),
                festivalForm.getFee(),
                festivalForm.getHomepage()
        );
    }
}
