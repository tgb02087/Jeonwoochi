package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FestivalFormRepo extends JpaRepository<FestivalForm, Long> {
    List<FestivalForm> findByUserId(Long userId);
}
