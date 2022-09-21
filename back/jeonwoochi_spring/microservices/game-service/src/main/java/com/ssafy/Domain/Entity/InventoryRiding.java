package com.ssafy.Domain.Entity;

import com.ssafy.Dto.InventoryRidingCreateRequest;
import com.ssafy.Dto.InventoryRidingUpdateRequest;
import com.ssafy.config.LoginUser.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class InventoryRiding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_riding_id")
    private Long id;

    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "riding_id")
    private Riding riding;

    public static InventoryRiding create(User user, Riding riding){
        InventoryRiding inventoryRiding = new InventoryRiding();
        inventoryRiding.userId = user.getId();
        inventoryRiding.riding = riding;
        return inventoryRiding;
    }

    public void update(User user, Riding riding){
        this.userId = user.getId();
        this.riding = riding;
    }
}
