package com.ssafy.Service;

import com.ssafy.Domain.Entity.Game;
import com.ssafy.Domain.Repository.GameRepo;
import com.ssafy.Dto.GameCreateRequest;
import com.ssafy.Dto.GameResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.exception.NotFoundException.GAME_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService{
    private final GameRepo gameRepo;


    @Override
    public GameResponse findGame(Long userId) {
        if(gameRepo.findById(userId).isPresent()){
            Game game = gameRepo.findById(userId)
                    .orElseThrow(()->new NotFoundException(GAME_NOT_FOUND));
            return GameResponse.response(game);
        }
        else{
            Game game = Game.create(userId, 9616L, 5712L, null, 1L);
            gameRepo.save(game);
            return GameResponse.response(game);
        }
    }

    @Override
    public GameResponse createGame(GameCreateRequest request) {
        Game game = Game.create(request.getUserId(), request.getX(), request.getY(), request.getRiding_id(), request.getCharacter_id());
        gameRepo.save(game);
        return GameResponse.response(game);
    }
}
