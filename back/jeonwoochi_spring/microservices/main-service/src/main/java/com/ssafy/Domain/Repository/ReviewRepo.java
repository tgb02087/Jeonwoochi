package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Review;
import com.ssafy.Dto.Response.ReviewResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepo extends JpaRepository<Review, Long> {

    List<Review> findByRestaurantId(Long restaurantId);
    Optional<Review> findTopByRestaurantIdAndUserIdOrderByIdDesc(Long restaurantId, Long userId);
}
