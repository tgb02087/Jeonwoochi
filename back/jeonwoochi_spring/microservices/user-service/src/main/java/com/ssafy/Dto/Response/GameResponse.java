package com.ssafy.Dto.Response;

import com.ssafy.Domain.Redis.GameRedis;
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

    public static GameResponse response(GameRedis game){
        return new GameResponse(
                game.getUserId(),
                game.getX(),
                game.getY()
        );
    }
}
