package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class QuestionRepo {

    private final EntityManager em;

    public void save(Question question) { em.persist(question); }
    public Question findOne(Long id) { return em.find(Question.class, id); }
}
