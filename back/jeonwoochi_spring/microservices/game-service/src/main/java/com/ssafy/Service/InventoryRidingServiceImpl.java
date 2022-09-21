package com.ssafy.Service;

import com.ssafy.Domain.Entity.InventoryRiding;
import com.ssafy.Domain.Entity.Riding;
import com.ssafy.Domain.Repository.InventoryRidingRepo;
import com.ssafy.Domain.Repository.RidingRepo;
import com.ssafy.Dto.InventoryRidingCreateRequest;
import com.ssafy.Dto.InventoryRidingResponse;
import com.ssafy.Dto.InventoryRidingUpdateRequest;
import com.ssafy.config.LoginUser.User;
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
    public void createInventoryRiding(User user, InventoryRidingCreateRequest request) {
        Riding riding = ridingRepo.findById(request.getRidingId())
                .orElseThrow(()-> new NotFoundException(RIDING_NOT_FOUND));
        if(inventoryRidingRepo.findByUserIdAndRiding(user.getId(), riding).isPresent())
            throw new DuplicateException(INVENTORY_RIDING_DUPLICATED);

        InventoryRiding inventoryRiding = InventoryRiding.create(user, riding);
        inventoryRidingRepo.save(inventoryRiding);
    }

    @Override
    public List<InventoryRidingResponse> findInventoryRiding(User user) {
        List<InventoryRidingResponse> inventoryRidings = inventoryRidingRepo.findByUserId(user.getId()).stream()
                .map(InventoryRidingResponse::response)
                .collect(Collectors.toList());
        return inventoryRidings;
    }

    @Override
    public InventoryRidingResponse updateInventoryRiding(User user, InventoryRidingUpdateRequest request) {
        Riding riding = ridingRepo.findById(request.getRidingId())
                .orElseThrow(()-> new NotFoundException(RIDING_NOT_FOUND));

        InventoryRiding inventoryRiding = inventoryRidingRepo.findById(request.getId())
                .orElseThrow(()-> new NotFoundException(INVENTORY_RIDING_NOT_FOUND));

        inventoryRiding.update(user, riding);
        return InventoryRidingResponse.response(inventoryRiding);
    }

    @Override
    public void deleteInventoryRiding(Long inventoryRidingId) {
        InventoryRiding inventoryRiding = inventoryRidingRepo.findById(inventoryRidingId)
                .orElseThrow(()-> new NotFoundException(INVENTORY_RIDING_NOT_FOUND));
        inventoryRidingRepo.delete(inventoryRiding);
    }
}
