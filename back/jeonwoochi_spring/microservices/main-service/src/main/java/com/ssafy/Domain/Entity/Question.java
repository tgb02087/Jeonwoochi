package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.QuestionRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

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

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Answer> answers;

    public static Question create(QuestionRequest questionRequest){
        Question qs = new Question();
        qs.question = questionRequest.getQuestion();
        return qs;
    }
}
