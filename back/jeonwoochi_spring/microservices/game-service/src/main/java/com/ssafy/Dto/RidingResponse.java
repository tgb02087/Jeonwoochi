package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Riding;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RidingResponse {

    private Long id;

    private String name;

    private String path;

    public static RidingResponse response(Riding riding){
        return new RidingResponse(
                riding.getId(),
                riding.getName(),
                riding.getPath()
        );
    }
}
