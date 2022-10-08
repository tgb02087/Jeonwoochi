package com.ssafy.Service;

import com.ssafy.Domain.Redis.GameRedis;
import com.ssafy.Domain.Repository.GameRedisRepo;
import com.ssafy.Dto.Request.GameCreateRequest;
import com.ssafy.Dto.Response.GameResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.exception.NotFoundException.GAME_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final GameRedisRepo gameRepo;


    @Override
    @Transactional
    public GameResponse findGame(Long userId) {
        if(gameRepo.findById(userId).isPresent()){
            GameRedis game = gameRepo.findById(userId)
                    .orElseThrow(()->new NotFoundException(GAME_NOT_FOUND));
            return GameResponse.response(game);
        }
        else{
            GameRedis game = GameRedis.create(userId, 9616L, 5712L);
            gameRepo.save(game);
            return GameResponse.response(game);
        }
    }

    @Override
    @Transactional
    public GameResponse createGame(Long userId, GameCreateRequest request) {
        GameRedis game = GameRedis.create(userId, request.getX(), request.getY());
        gameRepo.save(game);
        return GameResponse.response(game);
    }
}
