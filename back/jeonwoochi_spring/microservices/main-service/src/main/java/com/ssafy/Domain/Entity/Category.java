package com.ssafy.Domain.Entity;

import com.ssafy.Dto.Request.CategoryRequest;
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
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "category")
    private List<Question> questions = new ArrayList<>();

//    @OneToMany(mappedBy = "category")
//    private List<Answer> answers = new ArrayList<>();

    public static Category create(CategoryRequest categoryRequest){
        Category category = new Category();
        category.name = categoryRequest.getName();
        return category;
    }
}
