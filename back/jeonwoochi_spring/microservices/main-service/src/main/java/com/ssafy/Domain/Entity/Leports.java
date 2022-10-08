package com.ssafy.Domain.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Leports {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "leports_id")
    private Long id;

    private String name;

    private String category;

    private String address;

    private Double lat;

    private Double lng;
}
