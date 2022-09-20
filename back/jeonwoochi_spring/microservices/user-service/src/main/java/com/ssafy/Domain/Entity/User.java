package com.ssafy.Domain.Entity;

import com.ssafy.Dto.UserCreateRequest;
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

    private String gender;

    private int age;

    private String role;

    @ManyToOne
    @JoinColumn(name= "state_type_id")
    private StatusType statusType;

    public static User create(UserCreateRequest request){
       User user = new User();
       user.kakao_id = request.getKakao_id();
       user.google_id = request.getGoogle_id();
       user.name = request.getName();
       user.gender = request.getGender();
       user.age = request.getAge();
       user.role = request.getRole();
       return user;
    }

    public void update(UserCreateRequest request){
        this.kakao_id = request.getKakao_id();
        this.google_id = request.getGoogle_id();
        this.name = request.getName();
        this.gender = request.getGender();
        this.age = request.getAge();
        this.role = request.getRole();
    }
}
