package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;


public interface UserRepo extends JpaRepository<User, Long> {

    Optional<User> findByKakaoId(String kakaoId);
}
