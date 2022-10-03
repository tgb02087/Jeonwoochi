package com.ssafy.Dto.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@NotNull
@AllArgsConstructor
public class GameCreateRequest {
    private Long x;

    private Long y;
}
