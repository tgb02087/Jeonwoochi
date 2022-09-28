package com.ssafy.Service;

import com.ssafy.Dto.GameCreateRequest;
import com.ssafy.Dto.GameResponse;

public interface GameService {

    GameResponse findGame(Long userId);
    // 마지막 위치 변경
    GameResponse createGame(GameCreateRequest request);
}
