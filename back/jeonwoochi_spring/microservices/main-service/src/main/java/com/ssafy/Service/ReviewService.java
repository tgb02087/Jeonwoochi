package com.ssafy.Service;

import com.ssafy.Dto.Request.ReviewCreateRequest;
import com.ssafy.Dto.Request.ReviewUpdateRequest;
import com.ssafy.Dto.Response.ReviewResponse;

import java.util.List;

public interface ReviewService {

    // 리뷰 생성
    void createReview(Long userId, String gender, int age, ReviewCreateRequest request);

    // 해당 맛집에 대한 리뷰 리스트
    List<ReviewResponse> findReviewList(Long restaurantId);

    ReviewResponse updateReview(ReviewUpdateRequest request);

    void deleteReview(Long reviewId);
}
