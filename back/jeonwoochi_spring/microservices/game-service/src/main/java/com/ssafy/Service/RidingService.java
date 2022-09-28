package com.ssafy.Service;

import com.ssafy.Dto.RidingCreateRequest;
import com.ssafy.Dto.RidingResponse;
import com.ssafy.Dto.RidingUpdateRequest;

import java.util.List;

public interface RidingService {
    // 탈 것 추가
    void createRiding(List<RidingCreateRequest> requests);
    // 탈 것 전체 리스트
    List<RidingResponse> findRidingListAll();
    // 탈 것 수정
    RidingResponse updateRiding(RidingUpdateRequest request);
    // 탈 것 삭제
    void deleteRiding(Long ridingId);
}
