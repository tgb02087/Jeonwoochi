package com.ssafy.Domain.Entity;

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

    public static InventoryRiding create(Long userId, Riding riding){
        InventoryRiding inventoryRiding = new InventoryRiding();
        inventoryRiding.userId = userId;
        inventoryRiding.riding = riding;
        return inventoryRiding;
    }

    public void update(Long userId, Riding riding){
        this.userId = userId;
        this.riding = riding;
    }
}
