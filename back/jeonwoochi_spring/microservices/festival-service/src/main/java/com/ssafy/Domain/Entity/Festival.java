package com.ssafy.Domain.Entity;

import com.ssafy.Domain.Entity.Type.FestivalWayType;
import com.ssafy.Dto.FestivalCreateRequest;
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

    @Enumerated(EnumType.STRING)
    private FestivalWayType way;

    private Long x;

    private Long y;

    private Float lat;

    private Float lng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "festival_type_id")
    private FestivalType festivalType;


    public static Festival create(FestivalCreateRequest request){
        Festival festival = new Festival();
        festival.name = request.getName();
        festival.startDate = request.getStartDate();
        festival.finishDate = request.getFinishDate();
        festival.contents = request.getContents();
        festival.locate = request.getLocate();
        festival.image = request.getImage();
        festival.way = request.getWay();
        festival.x = request.getX();
        festival.y = request.getY();
        festival.lat = request.getLat();
        festival.lng = request.getLng();
        return festival;
    }
    public void update(FestivalUpdateRequest request){
        this.name = request.getName();
        this.startDate = request.getStartDate();
        this.finishDate = request.getFinishDate();
        this.contents = request.getContents();
        this.locate = request.getLocate();
        this.image = request.getImage();
        this.way = request.getWay();
        this.x = request.getX();
        this.y = request.getY();
        this.lat = request.getLat();
        this.lng = request.getLng();
    }
}
