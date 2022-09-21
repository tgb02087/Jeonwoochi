package com.ssafy.Domain.Entity;

import com.ssafy.Dto.CharacterCreateRequest;
import com.ssafy.Dto.CharacterUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Generated;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long id;

    private String name;

    private String path;

    public static Character create(CharacterCreateRequest request){
        Character character = new Character();
        character.name = request.getName();
        character.path = request.getPath();
        return character;
    }

    public void update(CharacterUpdateRequest request){
        this.name = request.getName();
        this.path = request.getPath();
    }
}
