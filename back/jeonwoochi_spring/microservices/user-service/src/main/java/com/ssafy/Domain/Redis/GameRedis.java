package com.ssafy.Domain.Redis;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;


@RedisHash("game")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class GameRedis {
    @Id
    private Long userId;

    private Long x;

    private Long y;

    public static GameRedis create (Long userId, Long x, Long y){
        GameRedis game = new GameRedis();
        game.userId = userId;
        game.x = x;
        game.y = y;
        return  game;
    }
}
