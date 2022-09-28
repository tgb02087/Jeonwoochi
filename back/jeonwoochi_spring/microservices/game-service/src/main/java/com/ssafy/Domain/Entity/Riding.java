package com.ssafy.Domain.Entity;

import com.ssafy.Dto.RidingCreateRequest;
import com.ssafy.Dto.RidingUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Riding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "riding_id")
    private Long id;

    private String name;

    private String path;

    @OneToMany(mappedBy = "riding", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InventoryRiding> inventoryRidings = new ArrayList<>();

    public static Riding create(RidingCreateRequest request){
        Riding riding = new Riding();
        riding.name = request.getName();
        riding.path = request.getPath();
        return riding;
    }

    public void update(RidingUpdateRequest request){
        this.name = request.getName();
        this.path = request.getPath();
    }
}
