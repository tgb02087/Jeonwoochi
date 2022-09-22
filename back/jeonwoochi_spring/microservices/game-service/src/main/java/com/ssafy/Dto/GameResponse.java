package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Game;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameResponse {
    private Long userId;

    private Long x;

    private Long y;

    private Long riding_id;

    private Long character_id;

    public static GameResponse response(Game game){
        return new GameResponse(
                game.getUserId(),
                game.getX(),
                game.getY(),
                game.getRiding_id(),
                game.getCharacter_id()
        );
    }
}
