package com.ssafy.Service;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Interest;
import com.ssafy.Domain.Repository.AnswerRepo;
import com.ssafy.Domain.Repository.InterestRepo;
import com.ssafy.Dto.Request.InterestRequest;
import com.ssafy.Dto.Request.InterestUpdateRequest;
import com.ssafy.Dto.Response.InterestResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InterestService {

    private final InterestRepo interestRepo;

    private final AnswerRepo answerRepo;

    //관심사항 등록
    @Transactional
    public String createInterest(InterestRequest interestRequest){
        try {
            Answer answer = answerRepo.findOne(interestRequest.getAnswerId());
            Interest interest = Interest.create(interestRequest,answer);
            interestRepo.save(interest);
            return "성공";
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "실패";
    }

    //관심사항 수정
    @Transactional
    public InterestResponse updateInterest(InterestUpdateRequest interestRequest){
        Answer answer = answerRepo.findOne(interestRequest.getAnswerId());
        Interest interest = interestRepo.findOne(interestRequest.getInterestId());
        interest.update(interestRequest,answer);
        return InterestResponse.create(interest);
    }
}
