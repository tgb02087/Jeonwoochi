package com.ssafy.Controller;

import com.ssafy.Dto.*;
import com.ssafy.Service.FestivalFormService;
import com.ssafy.Service.FestivalService;
import com.ssafy.Service.FestivalTypeService;
import com.ssafy.config.AwsS3Service;
import com.ssafy.config.LoginUser.LoginUser;
import com.ssafy.config.LoginUser.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class FestivalController {

    private static final String baseURL = "https://jeonwoochi.s3.ap-northeast-2.amazonaws.com/";

    private final AwsS3Service awsS3Service;

    private final FestivalService festivalService;
    private final FestivalFormService festivalFormService;
    private final FestivalTypeService festivalTypeService;


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
            @RequestPart(value = "img", required = false) final MultipartFile file,
            @Valid @RequestPart(value = "data", required = true) final FestivalFormCreateRequest request,
            @LoginUser User user
    ){
        String imgUrl = awsS3Service.uploadFile(file);
        festivalFormService.createFestivalForm(request, user.getId(), imgUrl);
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
    public ResponseEntity<?> findFestivalFormListAll(){
        return ResponseEntity.ok(festivalFormService.findFestivalFormListAll());
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

    // 축제 유형 추가
    @PostMapping("/festival-type")
    public ResponseEntity<?> createFestivalType(
            @Valid @RequestBody List<FestivalTypeCreateRequest> requests
    ){
        festivalTypeService.createFestivalType(requests);
        return ResponseEntity.ok().build();
    }
    // 축제 유형 전체 목록 조회
    @GetMapping("/festival-type")
    public ResponseEntity<?> findFestivalTypeListAll(){
        return ResponseEntity.ok(festivalTypeService.findFestivalTypeListAll());
    }
    // 축제 유형 수정
    @PutMapping("/festival-type")
    public ResponseEntity<?> updateFestivalType(
            @Valid @RequestBody FestivalTypeUpdateRequest request
    ){
        return ResponseEntity.ok(festivalTypeService.updateFestivalType(request));
    }
    // 축제 유형 삭제
    @DeleteMapping("/festival-type/{festivalTypeId}")
    public ResponseEntity<?> deleteFestivalType(
            @PathVariable Long festivalTypeId
    ){
        festivalTypeService.deleteFestivalType(festivalTypeId);
        return ResponseEntity.ok().build();
    }

}
