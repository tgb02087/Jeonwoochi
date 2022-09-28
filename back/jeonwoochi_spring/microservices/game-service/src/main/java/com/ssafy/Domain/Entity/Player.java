package com.ssafy.Domain.Entity;

import com.ssafy.Dto.PlayerCreateRequest;
import com.ssafy.Dto.PlayerUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long id;

    private String name;

    private String path;

    public static Player create(PlayerCreateRequest request){
        Player player = new Player();
        player.name = request.getName();
        player.path = request.getPath();
        return player;
    }

    public void update(PlayerUpdateRequest request){
        this.name = request.getName();
        this.path = request.getPath();
    }
}
