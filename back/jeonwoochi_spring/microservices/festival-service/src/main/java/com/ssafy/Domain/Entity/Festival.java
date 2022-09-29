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

    private String name;

    private Date startDate;

    private Date finishDate;

    private String contents;

    private String locate;

    private String image;

    private Double lat;

    private Double lng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "festival_type_id")
    private FestivalType festivalType;


    public static Festival create(FestivalForm festivalForm, Double lat, Double lng){
        Festival festival = new Festival();
        festival.name = festivalForm.getName();
        festival.startDate = festivalForm.getStartDate();
        festival.finishDate = festivalForm.getFinishDate();
        festival.contents = festivalForm.getContents();
        festival.locate = festivalForm.getLocate();
        festival.image = festivalForm.getImage();
        festival.lat = lat;
        festival.lng = lng;
        festival.festivalType = festivalForm.getFestivalType();
        return festival;
    }
    public void update(FestivalUpdateRequest request, FestivalType festivalType){
        this.name = request.getName();
        this.startDate = request.getStartDate();
        this.finishDate = request.getFinishDate();
        this.contents = request.getContents();
        this.locate = request.getLocate();
        this.image = request.getImage();
        this.lat = request.getLat();
        this.lng = request.getLng();
        this.festivalType = festivalType;
    }
}
