package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.FestivalForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FestivalFormRepo extends JpaRepository<FestivalForm, Long> {
    Page<FestivalForm> findByUserId(Long userId, Pageable pageable);

    @Override
    Page<FestivalForm> findAll(Pageable pageable);
}
