package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Interest;
import com.ssafy.Dto.Request.InterestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class InterestRepo {

    private final EntityManager em;

    public void save(Interest interest) { em.persist(interest); }

    public Interest findOne(Long id) { return em.find(Interest.class, id); }
}
