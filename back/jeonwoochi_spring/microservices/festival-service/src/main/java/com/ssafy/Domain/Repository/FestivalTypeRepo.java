package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FestivalTypeRepo extends JpaRepository<FestivalType, Long> {
}
