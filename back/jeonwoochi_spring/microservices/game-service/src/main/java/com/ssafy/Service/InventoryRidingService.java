package com.ssafy.Service;

import com.ssafy.Dto.InventoryRidingCreateRequest;
import com.ssafy.Dto.InventoryRidingResponse;
import com.ssafy.Dto.InventoryRidingUpdateRequest;

import java.util.List;

public interface InventoryRidingService {
    // 유저의 인벤토리에 탈 것 추가
    void createInventoryRiding(Long userId, InventoryRidingCreateRequest request);
    // 유저가 획득한 탈 것 리스트
    List<InventoryRidingResponse> findInventoryRiding(Long userId);
    // 유저가 획득한 탈 것 수정
    InventoryRidingResponse updateInventoryRiding(Long userId, InventoryRidingUpdateRequest request);
    // 유저가 획득한 탈 것 삭제
    void deleteInventoryRiding(Long inventoryId);
}
