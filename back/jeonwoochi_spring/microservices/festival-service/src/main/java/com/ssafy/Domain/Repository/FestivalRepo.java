package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FestivalRepo extends JpaRepository<Festival, Long> {

}
