package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalFormEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FestivalFormRepo extends JpaRepository<FestivalFormEntity, Long> {
}
