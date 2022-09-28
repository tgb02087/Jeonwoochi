package com.ssafy.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@NotNull
@AllArgsConstructor
public class GameCreateRequest {
    private Long userId;

    private Long x;

    private Long y;

    private Long riding_id;

    private Long character_id;
}
