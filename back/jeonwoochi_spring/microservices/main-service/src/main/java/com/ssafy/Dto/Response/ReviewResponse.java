package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Review;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewResponse {
    private Long reviewId;

    private Long userId;

    private int score;

    private String content;

    private String gender;

    private int age;

    public static ReviewResponse response(Review review){
        return new ReviewResponse(
                review.getId(),
                review.getUserId(),
                review.getScore(),
                review.getContent(),
                review.getGender(),
                review.getAge()
        );
    }
}
