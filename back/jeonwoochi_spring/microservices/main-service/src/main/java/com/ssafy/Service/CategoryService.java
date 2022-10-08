package com.ssafy.Service;

import com.ssafy.Domain.Entity.Category;
import com.ssafy.Domain.Repository.CategoryRepo;
import com.ssafy.Dto.Request.CategoryRequest;
import com.ssafy.Dto.Response.CategoryResponse;
import com.ssafy.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.exception.NotFoundException.CATEGORY_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepo categoryRepo;

    //카테고리 조회
    public CategoryResponse findCategory(String categoryid){
        Category category = categoryRepo.findById(categoryid)
                .orElseThrow(()-> new NotFoundException(CATEGORY_NOT_FOUND));
        return CategoryResponse.create(category);
    }

    @Transactional
    //카테고리 생성
    public void createCategory(CategoryRequest categoryRequest){
        Category category = Category.create(categoryRequest);
        categoryRepo.save(category);
    }
}
