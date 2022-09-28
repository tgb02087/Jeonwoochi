package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Redis.AuthRedis;
import org.springframework.data.repository.CrudRepository;

public interface AuthRedisRepo extends CrudRepository<AuthRedis, Long> {
}
