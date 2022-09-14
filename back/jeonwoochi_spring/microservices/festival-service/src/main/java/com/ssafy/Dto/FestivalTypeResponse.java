package com.ssafy.Dto;

import com.ssafy.Domain.Entity.FestivalTypeEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FestivalTypeResponse {

    private Long id;

    private String name;

    public static FestivalTypeResponse response(FestivalTypeEntity festivalType){
        return new FestivalTypeResponse(
                festivalType.getId(),
                festivalType.getName()
        );
    }
}
