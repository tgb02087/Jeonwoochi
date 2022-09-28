package com.ssafy.Service;


import com.ssafy.Domain.Entity.Player;
import com.ssafy.Domain.Repository.PlayerRepo;
import com.ssafy.Dto.PlayerCreateRequest;
import com.ssafy.Dto.PlayerResponse;
import com.ssafy.Dto.PlayerUpdateRequest;
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
public class PlayerServiceImpl implements PlayerService {
    private final PlayerRepo playerRepo;

    @Override
    @Transactional
    public void createPlayer(List<PlayerCreateRequest> requests) {
        requests.forEach(request -> {
            Player player = Player.create(request);
            playerRepo.save(player);
        });
    }

    @Override
    @Transactional
    public List<PlayerResponse> findPlayerListAll() {
        List<PlayerResponse> players = playerRepo.findAll().stream()
                .map(PlayerResponse::response)
                .collect(Collectors.toList());
        return players;
    }

    @Override
    @Transactional
    public PlayerResponse updatePlayer(PlayerUpdateRequest request) {
        Player player = playerRepo.findById(request.getId())
                .orElseThrow(()->new NotFoundException(CHARACTER_NOT_FOUND));
        player.update(request);
        return PlayerResponse.response(player);
    }

    @Override
    @Transactional
    public void deletePlayer(Long characterId) {
        Player player = playerRepo.findById(characterId)
                .orElseThrow(()->new NotFoundException(CHARACTER_NOT_FOUND));
        playerRepo.delete(player);
    }
}
