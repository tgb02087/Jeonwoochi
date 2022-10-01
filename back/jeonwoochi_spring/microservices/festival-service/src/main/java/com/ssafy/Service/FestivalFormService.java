package com.ssafy.Service;

import com.ssafy.Dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FestivalFormService {
    //축제 요청 추가
    void createFestivalForm(FestivalFormCreateRequest request, Long userId, String imgUrl);
    FestivalFormResponse findFestivalFormDetail(Long festivalFormId);
    //축제 요청 전체 리스트
    Page<FestivalFormResponse> findFestivalFormListAll(Pageable pageable);
    // 내가 요청한 축제 리스트
    Page<FestivalFormResponse> findFestivalFormListByMe(Long userId, Pageable pageable);
    //축제 요청 수정
    FestivalFormResponse updateFestivalForm(FestivalFormUpdateRequest request);
    //축제 요청 삭제
    void deleteFestivalForm(Long festivalFormId);

}
