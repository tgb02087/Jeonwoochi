package com.ssafy.Service;


import com.ssafy.Domain.Entity.Character;
import com.ssafy.Domain.Repository.CharacterRepo;
import com.ssafy.Dto.CharacterCreateRequest;
import com.ssafy.Dto.CharacterResponse;
import com.ssafy.Dto.CharacterUpdateRequest;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.CHARACTER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CharacterServiceImpl implements CharacterService{
    private final CharacterRepo characterRepo;

    @Override
    @Transactional
    public void createCharacter(List<CharacterCreateRequest> requests) {
        requests.forEach(request -> {
            Character character = Character.create(request);
            characterRepo.save(character);
        });
    }

    @Override
    @Transactional
    public List<CharacterResponse> findCharacterListAll() {
        List<CharacterResponse> characters = characterRepo.findAll().stream()
                .map(CharacterResponse::response)
                .collect(Collectors.toList());
        return characters;
    }

    @Override
    @Transactional
    public CharacterResponse updateCharacter(CharacterUpdateRequest request) {
        Character character = characterRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(CHARACTER_NOT_FOUND));
        character.update(request);
        return CharacterResponse.response(character);
    }

    @Override
    @Transactional
    public void deleteCharacter(Long characterId) {
        Character character = characterRepo.findById(characterId)
                .orElseThrow(()->new NotFoundException(CHARACTER_NOT_FOUND));
        characterRepo.delete(character);
    }
}
