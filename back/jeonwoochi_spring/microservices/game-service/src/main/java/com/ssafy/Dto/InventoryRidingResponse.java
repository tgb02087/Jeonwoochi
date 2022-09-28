package com.ssafy.Dto;

import com.ssafy.Domain.Entity.InventoryRiding;
import com.ssafy.Domain.Entity.Riding;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryRidingResponse {

    private Long id;

    private Riding riding;

    public static InventoryRidingResponse response(InventoryRiding inventoryRiding){
        return new InventoryRidingResponse(
                inventoryRiding.getId(),
                inventoryRiding.getRiding()
        );
    }
}
