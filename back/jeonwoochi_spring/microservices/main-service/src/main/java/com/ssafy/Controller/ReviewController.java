package com.ssafy.Controller;

import com.ssafy.Dto.Request.ReviewCreateRequest;
import com.ssafy.Dto.Request.ReviewUpdateRequest;
import com.ssafy.Service.ReviewService;
import com.ssafy.config.LoginUser.LoginUser;
import com.ssafy.config.LoginUser.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping("/review")
    public ResponseEntity<?> createReview(
            @LoginUser User user,
            @Valid @RequestBody ReviewCreateRequest request
            ){
        reviewService.createReview(user.getId(), user.getGender(), user.getAge(), request);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/review/{restaurantId}")
    public ResponseEntity<?> findReview(
            @PathVariable Long restaurantId
    ){
        return ResponseEntity.ok(reviewService.findReviewList(restaurantId));
    }

    @PutMapping("/review")
    public ResponseEntity<?> updateReview(
            @Valid @RequestBody ReviewUpdateRequest request
            ){
        return ResponseEntity.ok(reviewService.updateReview(request));
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Long reviewId
    ){
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
}
