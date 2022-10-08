package com.ssafy.Domain.Entity;

import com.ssafy.Dto.FestivalFormCreateRequest;
import com.ssafy.Dto.FestivalFormUpdateRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class FestivalForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "festival_form_id")
    private Long id;

    private String festivalName;

    private Date startDate;

    private Date endDate;

    @Column(length = 10000)
    private String description;

    private String address;

    private String image;

    private String fee;

    private String homepage;
    private Long userId;

    public static FestivalForm create(FestivalFormCreateRequest request, Long userId, String imgUrl){
        FestivalForm festival = new FestivalForm();
        festival.festivalName = request.getFestivalName();
        festival.startDate = request.getStartDate();
        festival.endDate = request.getEndDate();
        festival.description = request.getDescription();
        festival.address = request.getAddress();
        festival.image = imgUrl;
        festival.fee = request.getFee();
        festival.homepage =  request.getHomepage();
        festival.userId = userId;
        return festival;
    }
    public void update(FestivalFormUpdateRequest request){
        this.festivalName = request.getFestivalName();
        this.startDate = request.getStartDate();
        this.endDate = request.getEndDate();
        this.description = request.getDescription();
        this.address = request.getAddress();
        this.image = request.getImage();
        this.fee = request.getFee();
        this.homepage = request.getHomepage();
    }
}
