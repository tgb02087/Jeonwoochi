package com.ssafy.Controller;

import com.ssafy.Dto.*;
import com.ssafy.Service.CharacterService;
import com.ssafy.Service.GameService;
import com.ssafy.Service.InventoryRidingService;
import com.ssafy.Service.RidingService;
import com.ssafy.config.LoginUser.LoginUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class GameController {
    private final CharacterService characterService;
    private final RidingService ridingService;
    private final InventoryRidingService inventoryRidingService;
    private final GameService gameService;

    @PostMapping("/character")
    public ResponseEntity<?> createCharacter(
            @Valid @RequestBody List<CharacterCreateRequest> requests
            ){
        characterService.createCharacter(requests);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/character")
    public ResponseEntity<?> findCharacterListAll(

    ){
        return ResponseEntity.ok(characterService.findCharacterListAll());
    }
    @PutMapping("/character")
    public ResponseEntity<?> updateCharacter(
            @Valid @RequestBody CharacterUpdateRequest request)
    {
        return ResponseEntity.ok(characterService.updateCharacter(request));
    }
    @DeleteMapping("/character/{characterId}")
    public ResponseEntity<?> deleteCharacter(
            @PathVariable Long characterId
    ){
        characterService.deleteCharacter(characterId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/riding")
    public ResponseEntity<?> createRiding(
            @Valid @RequestBody List<RidingCreateRequest> requests
    ){
        ridingService.createRiding(requests);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/riding")
    public ResponseEntity<?> findRidingListAll(

    ){
        return ResponseEntity.ok(ridingService.findRidingListAll());
    }
    @PutMapping("/riding")
    public ResponseEntity<?> updateRiding(
            @Valid @RequestBody RidingUpdateRequest request
    ){
        return ResponseEntity.ok(ridingService.updateRiding(request));
    }
    @DeleteMapping("/riding/{ridingId}")
    public ResponseEntity<?> deleteRiding(
            @PathVariable Long ridingId
    ){
        ridingService.deleteRiding(ridingId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/inventory/riding")
    public ResponseEntity<?> createInventoryRiding(
            @LoginUser Long userId,
            @Valid @RequestBody InventoryRidingCreateRequest request
    ){
        inventoryRidingService.createInventoryRiding(userId, request);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/inventory/riding")
    public ResponseEntity<?> findInventoryRiding(
            @LoginUser Long userId
    ){
        return ResponseEntity.ok(inventoryRidingService.findInventoryRiding(userId));
    }
    @PutMapping("/inventory/riding")
    public ResponseEntity<?> updateInventoryRiding(
            @LoginUser Long userId,
            @Valid @RequestBody InventoryRidingUpdateRequest request
    ){
        return ResponseEntity.ok(inventoryRidingService.updateInventoryRiding(userId, request));
    }
    @DeleteMapping("/inventory/riding/{inventoryRidingId}")
    public ResponseEntity<?> deleteInventoryRiding(
            @PathVariable Long inventoryRidingId
    ){
        inventoryRidingService.deleteInventoryRiding(inventoryRidingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/game")
    public ResponseEntity<?> findGame(
            @LoginUser Long userId
    ){
        return ResponseEntity.ok(gameService.findGame(userId));
    }
    @PostMapping("/game")
    public ResponseEntity<?> createGame(
            @Valid @RequestBody GameCreateRequest request
    ){
        return ResponseEntity.ok(gameService.createGame(request));
    }
}
