package com.ssafy.Service;

import com.ssafy.Dto.*;

import java.util.List;

public interface FestivalFormService {
    //축제 요청 추가
    void createFestivalForm(List<FestivalFormCreateRequest> requests, Long userId);
    FestivalFormResponse findFestivalFormDetail(Long festivalFormId);
    //축제 요청 전체 리스트
    List<FestivalFormResponse> findFestivalFormListAll();
    // 내가 요청한 축제 리스트
    List<FestivalFormResponse> findFestivalFormListByMe(Long userId);
    //축제 요청 수정
    FestivalFormResponse updateFestivalForm(FestivalFormUpdateRequest request);
    //축제 요청 삭제
    void deleteFestivalForm(Long festivalFormId);

}
