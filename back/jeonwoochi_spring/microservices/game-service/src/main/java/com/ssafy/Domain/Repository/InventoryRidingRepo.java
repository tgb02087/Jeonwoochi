package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.InventoryRiding;
import com.ssafy.Domain.Entity.Riding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRidingRepo extends JpaRepository<InventoryRiding, Long> {
    List<InventoryRiding> findByUserId(Long userId);

    Optional<InventoryRiding> findByUserIdAndRiding(Long userId, Riding riding);
}
