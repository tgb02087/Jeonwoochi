package com.ssafy.Dto.Response;

import com.ssafy.Domain.Entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponse {

    private Long id;

    private String name;

    public static CategoryResponse create(Category category){
        return new CategoryResponse(
                category.getId(),
                category.getName()
        );
    }
}
