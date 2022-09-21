package com.ssafy.Dto;

import com.ssafy.Domain.Entity.Character;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterResponse {

    private Long id;

    private String name;

    private String path;

    public static CharacterResponse response(Character character){
        return new CharacterResponse(
                character.getId(),
                character.getName(),
                character.getPath()
        );
    }
}
