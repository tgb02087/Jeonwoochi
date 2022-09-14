package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FestivalTypeRepo extends JpaRepository<FestivalTypeEntity, Long> {
}
