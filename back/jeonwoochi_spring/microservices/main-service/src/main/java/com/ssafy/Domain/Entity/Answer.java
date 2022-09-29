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

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "answer")
    List<Interest> interests = new ArrayList<>();


    public static Answer create(AnswerRequest request, Category category){
        Answer as = new Answer();
        as.answer = request.getAnswer();
        as.category = category;
        return as;
    }
}
