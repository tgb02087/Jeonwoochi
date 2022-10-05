package com.ssafy.Domain.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Lodgment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lodgment_id")
    private Long id;

    private String name;

    private String category;

    private String address;

    private Double lat;

    private Double lng;

}
