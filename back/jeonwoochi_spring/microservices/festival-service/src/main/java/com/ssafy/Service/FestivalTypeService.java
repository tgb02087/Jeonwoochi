package com.ssafy.Service;

import com.ssafy.Domain.Entity.FestivalType;
import com.ssafy.Dto.FestivalTypeCreateRequest;
import com.ssafy.Dto.FestivalTypeResponse;
import com.ssafy.Dto.FestivalTypeUpdateRequest;

import java.util.List;

public interface FestivalTypeService {
    // 축테 타입 추가
    void createFestivalType(List<FestivalTypeCreateRequest> requests);

    // 축제 타입 전체 리스트 조회
    List<FestivalTypeResponse> findFestivalTypeListAll();

    // 축제 타입 수정
    FestivalTypeResponse updateFestivalType(FestivalTypeUpdateRequest request);
    // 축제 타입 삭제
    void deleteFestivalType(Long festivalTypeId);
}
