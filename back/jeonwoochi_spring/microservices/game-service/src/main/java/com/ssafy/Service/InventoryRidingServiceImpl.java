package com.ssafy.Service;

import com.ssafy.Domain.Entity.InventoryRiding;
import com.ssafy.Domain.Entity.Riding;
import com.ssafy.Domain.Repository.InventoryRidingRepo;
import com.ssafy.Domain.Repository.RidingRepo;
import com.ssafy.Dto.InventoryRidingCreateRequest;
import com.ssafy.Dto.InventoryRidingResponse;
import com.ssafy.Dto.InventoryRidingUpdateRequest;
import com.ssafy.exception.DuplicateException;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.exception.DuplicateException.INVENTORY_RIDING_DUPLICATED;
import static com.ssafy.exception.NotFoundException.INVENTORY_RIDING_NOT_FOUND;
import static com.ssafy.exception.NotFoundException.RIDING_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InventoryRidingServiceImpl implements InventoryRidingService{
    private final RidingRepo ridingRepo;
    private final InventoryRidingRepo inventoryRidingRepo;


    @Override
    @Transactional
    public void createInventoryRiding(Long userId, InventoryRidingCreateRequest request) {
        Riding riding = ridingRepo.findById(request.getRidingId())
                .orElseThrow(()-> new NotFoundException(RIDING_NOT_FOUND));
        if(inventoryRidingRepo.findByUserIdAndRiding(userId, riding).isPresent())
            throw new DuplicateException(INVENTORY_RIDING_DUPLICATED);

        InventoryRiding inventoryRiding = InventoryRiding.create(userId, riding);
        inventoryRidingRepo.save(inventoryRiding);
    }

    @Override
    @Transactional
    public List<InventoryRidingResponse> findInventoryRiding(Long userId) {
        List<InventoryRidingResponse> inventoryRidings = inventoryRidingRepo.findByUserId(userId).stream()
                .map(InventoryRidingResponse::response)
                .collect(Collectors.toList());
        return inventoryRidings;
    }

    @Override
    @Transactional
    public InventoryRidingResponse updateInventoryRiding(Long userId, InventoryRidingUpdateRequest request) {
        Riding riding = ridingRepo.findById(request.getRidingId())
                .orElseThrow(()-> new NotFoundException(RIDING_NOT_FOUND));

        InventoryRiding inventoryRiding = inventoryRidingRepo.findById(request.getId())
                .orElseThrow(()-> new NotFoundException(INVENTORY_RIDING_NOT_FOUND));

        inventoryRiding.update(userId, riding);
        return InventoryRidingResponse.response(inventoryRiding);
    }

    @Override
    @Transactional
    public void deleteInventoryRiding(Long inventoryRidingId) {
        InventoryRiding inventoryRiding = inventoryRidingRepo.findById(inventoryRidingId)
                .orElseThrow(()-> new NotFoundException(INVENTORY_RIDING_NOT_FOUND));
        inventoryRidingRepo.delete(inventoryRiding);
    }
}
