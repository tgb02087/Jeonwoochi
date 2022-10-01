package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.ReviewCreateRequest;
import com.ssafy.Dto.Request.ReviewUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Review extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    private Long restaurantId;

    private Long userId;

    private int score;

    @Column(length = 2000)
    private String content;

    private String gender;

    private int age;

    public static Review create(Long userId, String gender, int age, ReviewCreateRequest request){
        Review review = new Review();
        review.restaurantId = request.getRestaurantId();
        review.userId = userId;
        review.score = request.getScore();
        review.content = request.getContent();
        review.gender = gender;
        review.age = age;
        return review;
    }
    public void update(ReviewUpdateRequest request){
        this.score = request.getScore();
        this.content = request.getContent();
    }
}
