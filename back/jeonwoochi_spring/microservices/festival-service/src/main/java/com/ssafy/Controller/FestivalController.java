package com.ssafy.Controller;

import com.ssafy.Dto.*;
import com.ssafy.Service.FestivalFormService;
import com.ssafy.Service.FestivalService;
import com.ssafy.config.AwsS3Service;
import com.ssafy.config.LoginUser.LoginUser;
import com.ssafy.config.LoginUser.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class FestivalController {

    private static final String baseURL = "https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/";

    private final AwsS3Service awsS3Service;

    private final FestivalService festivalService;
    private final FestivalFormService festivalFormService;


    // 축제 추가 ( 승인 ) [ 어드민 ]
    @PostMapping("/festival")
    public ResponseEntity<?> createFestival(
            @Valid @RequestBody FestivalCreateRequest request
            ){
        festivalService.createFestival(request);
        return ResponseEntity.ok().build();
    }
    // 축제 상세 정보
    @GetMapping("/festival/{festivalId}")
    public ResponseEntity<?> findFestivalDetail(
            @PathVariable Long festivalId
    ){
        return ResponseEntity.ok(festivalService.findFestivalDetail(festivalId));
    }
    // 축제 전체 리스트
    @GetMapping("/festival")
    public ResponseEntity<?> findFestivalListAll(

    ){
        return ResponseEntity.ok(festivalService.findFestivalListAll());
    }
    // 마감된 축제 리스트
    @GetMapping("/festival/ed")
    public ResponseEntity<?> findFestivalListEd(

    ){
        return ResponseEntity.ok(festivalService.findFestivalListEd());
    }
    // 진행중인 축제 리스트
    @GetMapping("/festival/ing")
    public ResponseEntity<?> findFestivalListIng(

    ){
        return ResponseEntity.ok(festivalService.findFestivalListIng());
    }
    // 시작 예정인 축제 리스트
    @GetMapping("/festival/will")
    public ResponseEntity<?> findFestivalListWill(

    ){
        return ResponseEntity.ok(festivalService.findFestivalListWill());
    }
    @GetMapping("/festival/top3")
    public ResponseEntity<?> findFestivalListTop3(

    ){
        return ResponseEntity.ok(festivalService.findFestivalListTop3());
    }
    // 축제 수정
    @PutMapping("/festival")
    public ResponseEntity<?> updateFestival(
            @Valid @RequestBody FestivalUpdateRequest request
            ){
        return ResponseEntity.ok(festivalService.updateFestival(request));
    }
    // 축제 삭제
    @DeleteMapping("/festival/{festivalId}")
    public ResponseEntity<?> deleteFestival(
            @PathVariable Long festivalId
    ){
        festivalService.deleteFestival(festivalId);
        return ResponseEntity.ok().build();
    }


    // 축제 요청 추가
    @PostMapping(path = "/festival-form", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createFestivalForm(
            @RequestPart(value = "img", required = true) final MultipartFile file,
            @Valid @RequestPart(value = "data", required = true) final FestivalFormCreateRequest request,
            @LoginUser User user
    ){
        System.out.println(file);
        System.out.println(request);
        String imgUrl = awsS3Service.uploadFile(file);
        festivalFormService.createFestivalForm(request, user.getId(), baseURL+imgUrl);
        return ResponseEntity.ok().build();
    }
    // 축제 요청 상세 보기
    @GetMapping("/festival-form/{festivalFormId}")
    public ResponseEntity<?> findFestivalFormDetail(
            @PathVariable Long festivalFormId
    ){
        return ResponseEntity.ok(festivalFormService.findFestivalFormDetail(festivalFormId));
    }
    // 축제 요청 전체 리스트 조회
    @GetMapping("/festival-form")
    public ResponseEntity<?> findFestivalFormListAll(
            Pageable pageable
    ){
        return ResponseEntity.ok(festivalFormService.findFestivalFormListAll(pageable));
    }
    // 축제 요청 수정
    @PutMapping("/festival-form")
    public ResponseEntity<?> updateFestivalForm(
            @Valid @RequestBody FestivalFormUpdateRequest request
    ){
        return ResponseEntity.ok(festivalFormService.updateFestivalForm(request));
    }
    // 축제 요청 삭제
    @DeleteMapping("festival-form/{festivalFormId}")
    public ResponseEntity<?> deleteFestivalForm(
            @PathVariable Long festivalFormId
    ){
        festivalFormService.deleteFestivalForm(festivalFormId);
        return ResponseEntity.ok().build();
    }

    // 축제 커스텀 조회
    @GetMapping("festival/list")
    public ResponseEntity<?> findFestivalCustom(){
        return ResponseEntity.ok(festivalService.findFestivalCustom());
    }

}
