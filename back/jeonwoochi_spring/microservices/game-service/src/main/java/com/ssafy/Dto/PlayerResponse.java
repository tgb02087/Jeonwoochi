package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerResponse {

    private Long id;

    private String name;

    private String path;

    public static PlayerResponse response(Player player){
        return new PlayerResponse(
                player.getId(),
                player.getName(),
                player.getPath()
        );
    }
}
