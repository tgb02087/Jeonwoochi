package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FestivalRepo extends JpaRepository<FestivalEntity, Long> {
    Optional<FestivalEntity> findById(Long id);
}
