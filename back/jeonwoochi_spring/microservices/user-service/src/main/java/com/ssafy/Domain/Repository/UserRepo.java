package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepo {

    private final EntityManager em;

    public void save(User user){
        em.persist(user);
    }
    //기본 프라이머리키로 찾기
    public User findOne(Long id){
        return em.find(User.class, id);
    }

    //kakao_id로 찾기
    public List<User> findById(String kakao_id){
        return em.createQuery("SELECT u from User u where u.kakao_id = : kakao_id", User.class)
                .setParameter("kakao_id", kakao_id)
                .getResultList();
    }
}
