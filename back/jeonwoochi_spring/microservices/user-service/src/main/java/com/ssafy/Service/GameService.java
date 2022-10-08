package com.ssafy.Service;


import com.ssafy.Dto.Request.GameCreateRequest;
import com.ssafy.Dto.Response.GameResponse;

public interface GameService {

    GameResponse findGame(Long userId);
    // 마지막 위치 변경
    GameResponse createGame(Long userId, GameCreateRequest request);
}
