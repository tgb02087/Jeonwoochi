package com.ssafy.Domain.Entity;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Entity.Type.StateType;
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

    private String kakaoId;
    private String googleId;

    private String name;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    private int age;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Enumerated(EnumType.STRING)
    private StateType stateType;

    private Boolean isDummy;

    public static User create(UserRequest request){
       User user = new User();
       user.kakaoId = request.getKakao_id();
       user.googleId = request.getGoogle_id();
       user.name = request.getName();
       user.gender = request.getGender();
       user.age = request.getAge();
       user.role = request.getRole();
       user.stateType = request.getStateType();
       user.isDummy = request.getIs_dummy();
       return user;
    }

    public void update(User request){
        this.kakaoId = request.getKakaoId();
        this.googleId = request.getGoogleId();
        this.name = request.getName();
        this.gender = request.getGender();
        this.age = request.getAge();
        this.role = request.getRole();
        this.stateType = request.getStateType();
        this.isDummy = request.getIsDummy();
    }

    public void disable(StateType type){
        this.stateType = type;
    }
}
