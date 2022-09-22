package com.ssafy.Service;

import com.ssafy.Dto.CharacterCreateRequest;
import com.ssafy.Dto.CharacterResponse;
import com.ssafy.Dto.CharacterUpdateRequest;

import java.util.List;

public interface CharacterService {
    // 캐릭터 추가
    void createCharacter(List<CharacterCreateRequest> requests);
    // 캐릭터 전체 리스트
    List<CharacterResponse> findCharacterListAll();
    // 캐릭터 수정
    CharacterResponse updateCharacter(CharacterUpdateRequest request);
    // 캐릭터 삭제
    void deleteCharacter(Long characterId);
}
