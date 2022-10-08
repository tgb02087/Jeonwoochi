package com.ssafy.Domain.Repository;

import com.ssafy.Domain.Entity.Answer;
import com.ssafy.Domain.Entity.Question;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

public interface AnswerRepo extends JpaRepository<Answer, Long> {
    List<Answer> findByQuestion(Question question);
}
