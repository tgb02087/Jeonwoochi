package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Game;
import org.springframework.data.repository.CrudRepository;

public interface GameRepo extends CrudRepository<Game, Long> {
}
