package com.ssafy.Service;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Interest;
import com.ssafy.Domain.Repository.AnswerRepo;
import com.ssafy.Domain.Repository.InterestRepo;
import com.ssafy.Dto.Request.InterestRequest;
import com.ssafy.Dto.Request.InterestUpdateRequest;
import com.ssafy.Dto.Response.InterestResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.exception.NotFoundException.ANSWER_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.INTEREST_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterestService {

    private final InterestRepo interestRepo;

    private final AnswerRepo answerRepo;

    //관심사항 등록
    @Transactional
    public void createInterest(Long userId, List<InterestRequest> requests){
        requests.forEach(interestRequest -> {
            Answer answer = answerRepo.findById(interestRequest.getAnswerId())
                    .orElseThrow(()->new NotFoundException(ANSWER_NOT_FOUND));
            answer.getCategories().forEach(category -> {
                Interest interest = Interest.create(userId, category);
                interestRepo.save(interest);
                });
        });
    }
}
