package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Redis.GameRedis;
import org.springframework.data.repository.CrudRepository;

public interface GameRedisRepo extends CrudRepository<GameRedis, Long> {
}
