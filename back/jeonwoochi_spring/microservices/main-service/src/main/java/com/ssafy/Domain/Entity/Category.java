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
    @Column(name = "category_id")
    private String id;

    private String name;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Interest> interests;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    public static Category create(CategoryRequest categoryRequest){
        Category category = new Category();
        category.name = categoryRequest.getName();
        return category;
    }
}
