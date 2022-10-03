package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface FestivalRepo extends JpaRepository<Festival, Long> {
    List<Festival> findByEndDateBefore(Date now);
    List<Festival> findByStartDateBeforeAndEndDateAfter(Date now, Date now2);
    List<Festival> findByStartDateAfter(Date now);

    List<Festival> findTop3ByEndDateAfterOrderByEndDate(Date now);
}