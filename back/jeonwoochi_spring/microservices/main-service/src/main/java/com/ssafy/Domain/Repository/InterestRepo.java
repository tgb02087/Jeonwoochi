package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Interest;
import com.ssafy.Dto.Request.InterestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

public interface InterestRepo extends JpaRepository<Interest, Long> {
    List<Interest> findByUserId(Long userId);
}
