package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.AnswerRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long id;

    private String answer;

    private String image;

    @OneToMany(mappedBy = "answer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Category> categories;


    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public static Answer create(AnswerRequest request, Question question){
        Answer as = new Answer();
        as.answer = request.getAnswer();
        as.question = question;
        return as;
    }
}
