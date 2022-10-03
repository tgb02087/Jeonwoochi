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
    @JoinColumn(name = "answer_id")
    private Answer answer;

    public static Interest create(InterestRequest interestRequest, Answer answer){
        Interest interest = new Interest();
        interest.userId = interestRequest.getUserId();
        interest.answer = answer;
        return interest;
    }

    public void update(InterestUpdateRequest interestRequest, Answer answer){
        this.userId = interestRequest.getUserId();
        this.answer = answer;
    }
}
