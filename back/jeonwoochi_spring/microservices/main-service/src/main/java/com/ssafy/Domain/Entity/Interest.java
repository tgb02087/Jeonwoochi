package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.InterestRequest;
import com.ssafy.Dto.Request.InterestUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Interest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_id")
    private Long id;

    private Long userId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public static Interest create(Long userId, Category category){
        Interest interest = new Interest();
        interest.userId = userId;
        interest.category = category;
        return interest;
    }

    public void update(InterestUpdateRequest interestRequest, Category category){
        this.userId = interestRequest.getUserId();
        this.category = category;
    }
}
