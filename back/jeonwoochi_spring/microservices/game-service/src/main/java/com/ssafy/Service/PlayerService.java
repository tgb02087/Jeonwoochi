package com.ssafy.Service;

import com.ssafy.Dto.PlayerCreateRequest;
import com.ssafy.Dto.PlayerResponse;
import com.ssafy.Dto.PlayerUpdateRequest;

import java.util.List;

public interface PlayerService {
    // 캐릭터 추가
    void createPlayer(List<PlayerCreateRequest> requests);
    // 캐릭터 전체 리스트
    List<PlayerResponse> findPlayerListAll();
    // 캐릭터 수정
    PlayerResponse updatePlayer(PlayerUpdateRequest request);
    // 캐릭터 삭제
    void deletePlayer(Long PlayerId);
}
