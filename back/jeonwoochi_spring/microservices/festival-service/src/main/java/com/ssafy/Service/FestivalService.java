package com.ssafy.Service;

import com.ssafy.Dto.FestivalCreateRequest;
import com.ssafy.Dto.FestivalResponse;
import com.ssafy.Dto.FestivalUpdateRequest;

import java.util.List;

public interface FestivalService {

    //축제 추가 ( 승인 )
    void createFestival(FestivalCreateRequest request);
    // 축제 상세 조회
    FestivalResponse findFestivalDetail(Long festivalId);
    //축제 전체 리스트
    List<FestivalResponse> findFestivalListAll();
    // 마감한 축제 리스트
    List<FestivalResponse> findFestivalListEd();
    // 진행중인 축제 리스트
    List<FestivalResponse> findFestivalListIng();
    // 예정인 축제 리스트
    List<FestivalResponse> findFestivalListWill();
    // 마감날짜 기반 상위 3개 리스트
    List<FestivalResponse> findFestivalListTop3();
    //축제 수정
    FestivalResponse updateFestival(FestivalUpdateRequest request);
    //축제 삭제
    void deleteFestival(Long festivalId);
    //축제 전체 리스트 커스텀
    List<FestivalResponse> findFestivalCustom();

}
