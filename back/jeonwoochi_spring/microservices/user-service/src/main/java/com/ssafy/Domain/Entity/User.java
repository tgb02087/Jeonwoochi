package com.ssafy.Domain.Entity;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Dto.Request.UserRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String kakao_id;

    private String google_id;

    private String name;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    private int age;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @ManyToOne
    @JoinColumn(name= "state_type_id")
    private StatusType statusType;

    private Boolean is_dummy;

    public static User create(UserRequest request){
       User user = new User();
       user.kakao_id = request.getKakao_id();
       user.google_id = request.getGoogle_id();
       user.name = request.getName();
       user.gender = request.getGender();
       user.age = request.getAge();
       user.role = request.getRole();
       return user;
    }

    public void update(UserRequest request){
        this.kakao_id = request.getKakao_id();
        this.google_id = request.getGoogle_id();
        this.name = request.getName();
        this.gender = request.getGender();
        this.age = request.getAge();
        this.role = request.getRole();
    }
}