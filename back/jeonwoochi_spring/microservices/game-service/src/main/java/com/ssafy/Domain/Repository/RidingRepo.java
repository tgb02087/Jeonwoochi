package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Riding;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RidingRepo extends JpaRepository<Riding, Long> {
}
