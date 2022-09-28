package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepo extends JpaRepository<Player, Long> {
}
