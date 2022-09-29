package com.ssafy.Domain.Entity;

import com.ssafy.Dto.FestivalTypeCreateRequest;
import com.ssafy.Dto.FestivalTypeUpdateRequest;
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
public class FestivalType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "festival_type_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "festivalType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Festival> festivals = new ArrayList<>();

    @OneToMany(mappedBy = "festivalType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FestivalForm> festivalForms = new ArrayList<>();

    public static FestivalType create(FestivalTypeCreateRequest request){
        FestivalType festivalType = new FestivalType();
        festivalType.name = request.getName();
        return festivalType;
    }

    public void update(FestivalTypeUpdateRequest request){
        this.name = request.getName();
    }
}
