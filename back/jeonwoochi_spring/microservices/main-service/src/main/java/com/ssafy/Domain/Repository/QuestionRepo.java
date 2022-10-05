package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

public interface QuestionRepo extends JpaRepository<Question, Long> {
}
