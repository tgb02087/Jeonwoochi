package com.ssafy.Domain.Entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Id;

@RedisHash("game")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Game {
    @Id
    private Long userId;

    private Long x;

    private Long y;

    private Long riding_id;

    private Long character_id;

    public static Game create (Long userId, Long x, Long y, Long riding_id, Long character_id){
        Game game = new Game();
        game.userId = userId;
        game.x = x;
        game.y = y;
        game.riding_id = riding_id;
        game.character_id = character_id;
        return  game;
    }
}
