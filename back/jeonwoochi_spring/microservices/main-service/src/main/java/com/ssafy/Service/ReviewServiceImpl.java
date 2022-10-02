package com.ssafy.Service;

import com.ssafy.Domain.Entity.Review;
import com.ssafy.Domain.Repository.ReviewRepo;
import com.ssafy.Dto.Request.ReviewCreateRequest;
import com.ssafy.Dto.Request.ReviewUpdateRequest;
import com.ssafy.Dto.Response.ReviewResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.NotFoundException.REVIEW_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepo reviewRepo;

    @Override
    @Transactional
    public void createReview(Long userId, String gender, int age, ReviewCreateRequest request) {
        Review review = Review.create(userId, gender, age, request);
        reviewRepo.save(review);
    }

    @Override
    @Transactional
    public List<ReviewResponse> findReviewList(Long restaurantId) {
        List<ReviewResponse> reviews = reviewRepo.findByRestaurantId(restaurantId).stream()
                .map(ReviewResponse::response)
                .collect(Collectors.toList());
        return reviews;
    }

    @Override
    @Transactional
    public ReviewResponse updateReview(ReviewUpdateRequest request) {
        Review review = reviewRepo.findById(request.getReview_id())
                .orElseThrow(()-> new NotFoundException(REVIEW_NOT_FOUND));
        review.update(request);
        return ReviewResponse.response(review);
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepo.findById(reviewId)
                .orElseThrow(()-> new NotFoundException(REVIEW_NOT_FOUND));
        reviewRepo.delete(review);
    }
}
