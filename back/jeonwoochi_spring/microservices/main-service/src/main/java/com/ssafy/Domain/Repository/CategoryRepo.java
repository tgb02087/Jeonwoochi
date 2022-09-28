package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@Repository
@RequiredArgsConstructor
public class CategoryRepo {
    private final EntityManager em;

    public void save(Category category){ em.persist(category); }

    public Category findOne(Long id){ return em.find(Category.class,id); }
}
