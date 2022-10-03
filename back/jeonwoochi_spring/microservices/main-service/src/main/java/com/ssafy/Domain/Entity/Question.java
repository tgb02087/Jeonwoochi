package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.QuestionRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    private String question;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public static Question create(QuestionRequest questionRequest, Category category){
        Question qs = new Question();
        qs.question = questionRequest.getQuestion();
        qs.category = category;
        return qs;
    }
}
