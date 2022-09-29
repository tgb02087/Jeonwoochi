package com.ssafy.Service;

import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Dto.Request.CategoryRequest;
import com.ssafy.Dto.Response.CategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepo categoryRepo;

    //카테고리 조회
    public CategoryResponse findCategory(Long categoryid){
        Category category = categoryRepo.findOne(categoryid);
        return CategoryResponse.create(category);
    }

    @Transactional
    //카테고리 생성
    public String createCategory(CategoryRequest categoryRequest){
        try {
            Category category = Category.create(categoryRequest);
            categoryRepo.save(category);
            return "성공";
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return "실패";
    }
}
