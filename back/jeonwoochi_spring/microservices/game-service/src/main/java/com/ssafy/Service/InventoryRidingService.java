package com.ssafy.Service;

import com.ssafy.Dto.InventoryRidingCreateRequest;
import com.ssafy.Dto.InventoryRidingResponse;
import com.ssafy.Dto.InventoryRidingUpdateRequest;
import com.ssafy.config.LoginUser.User;

import java.util.List;

public interface InventoryRidingService {
    // 유저의 인벤토리에 탈 것 추가
    void createInventoryRiding(User user, InventoryRidingCreateRequest request);
    // 유저가 획득한 탈 것 리스트
    List<InventoryRidingResponse> findInventoryRiding(User user);
    // 유저가 획득한 탈 것 수정
    InventoryRidingResponse updateInventoryRiding(User user, InventoryRidingUpdateRequest request);
    // 유저가 획득한 탈 것 삭제
    void deleteInventoryRiding(Long inventoryId);
}
