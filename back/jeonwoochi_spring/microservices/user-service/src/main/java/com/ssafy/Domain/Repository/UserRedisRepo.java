package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRedisRepo extends CrudRepository<User, String> {
}
