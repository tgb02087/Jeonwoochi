package com.ssafy.Domain.Entity;

import com.ssafy.Dto.FestivalUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Festival {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "festival_id")
    private Long id;

    private String festivalName;

    private Date startDate;

    private Date endDate;

    @Column(length = 10000)
    private String description;

    private String address;

    private String image;

    private Double lat;

    private Double lng;

    private String fee;

    private String homepage;
    public static Festival create(FestivalForm festivalForm, Double lat, Double lng){
        Festival festival = new Festival();
        festival.festivalName = festivalForm.getFestivalName();
        festival.startDate = festivalForm.getStartDate();
        festival.endDate = festivalForm.getEndDate();
        festival.description = festivalForm.getDescription();
        festival.address = festivalForm.getAddress();
        festival.image = festivalForm.getImage();
        festival.lat = lat;
        festival.lng = lng;
        festival.fee = festivalForm.getFee();
        festival.homepage = festivalForm.getHomepage();
        return festival;
    }
    public void update(FestivalUpdateRequest request){
        this.festivalName = request.getFestivalName();
        this.startDate = request.getStartDate();
        this.endDate = request.getEndDate();
        this.description = request.getDescription();
        this.address = request.getAddress();
        this.image = request.getImage();
        this.lat = request.getLat();
        this.lng = request.getLng();
        this.fee = request.getFee();
        this.homepage = request.getHomepage();
    }
}
