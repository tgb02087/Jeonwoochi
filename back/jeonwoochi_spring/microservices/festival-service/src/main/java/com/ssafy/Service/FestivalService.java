package com.ssafy.Service;

import com.ssafy.Dto.FestivalCreateRequest;
import com.ssafy.Dto.FestivalResponse;
import com.ssafy.Dto.FestivalUpdateRequest;

import java.util.List;

public interface FestivalService {

    //축제 추가 ( 승인 )
    void createFestival(List<FestivalCreateRequest> requests);
    FestivalResponse findFestivalDetail(Long festivalId);
    //축제 전체 리스트
    List<FestivalResponse> findFestivalListAll();
    //축제 수정
    FestivalResponse updateFestival(FestivalUpdateRequest request);
    //축제 삭제
    void deleteFestival(Long festivalId);


}
