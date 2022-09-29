package com.ssafy.Controller;

import com.ssafy.Config.LoginUser.LoginUser;
import com.ssafy.Config.LoginUser.User;
import com.ssafy.Dto.Request.GameCreateRequest;
import com.ssafy.Service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping("/game")
    public ResponseEntity<?> findGame(
            @LoginUser User user
            ){
        return ResponseEntity.ok(gameService.findGame(user.getId()));
    }
    @PostMapping("/game")
    public ResponseEntity<?> createGame(
            @LoginUser User user,
            @Valid @RequestBody GameCreateRequest request
    ){
        return ResponseEntity.ok(gameService.createGame(user.getId(), request));
    }
}
