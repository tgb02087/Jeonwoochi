package com.ssafy.Controller;

import com.ssafy.Dto.Request.*;
import com.ssafy.Service.*;
import com.ssafy.config.LoginUser.LoginUser;
import com.ssafy.config.LoginUser.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class InterestController {

    private final InterestService is;

    private final CategoryService cs;

    private final QuestionService qs;

    private final AnswerService as;

    private final AroundService aroundService;

    //질문 조회
    @GetMapping("/question")
    public ResponseEntity<?> getQuestion(){
        return ResponseEntity.ok(qs.findQuestion());
    }

    //질문 생성
    @PostMapping("/question")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest request, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        qs.createQuestion(request);
        return ResponseEntity.ok().build();
    }

    //답변 조회
//    @GetMapping("/answer")
//    public ResponseEntity<?> getAnswer(@RequestParam(value = "answerId")Long answerId){
//        return new ResponseEntity<>(as.findAnswer(answerId),HttpStatus.OK);
//    }

    //답변 생성
    @PostMapping("/answer")
    public ResponseEntity<?> createAnswer(@Valid @RequestBody AnswerRequest request, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        as.createAnswer(request);
        return ResponseEntity.ok().build();
    }

    //카테고리 조회
//    @GetMapping("/category")
//    public ResponseEntity<?> getCategory(@RequestParam(value = "categoryId")Long categoryId){
//        return new ResponseEntity<>(cs.findCategory(categoryId),HttpStatus.OK);
//    }

    //카테고리 생성
    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequest request, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        cs.createCategory(request);
        return ResponseEntity.ok().build();
    }

    //관심분야 작성
    @PostMapping("/interest")
    public ResponseEntity<?> createInterest(
            @LoginUser User user,
            @Valid @RequestBody List<InterestRequest> requests){
        is.createInterest(user.getId(), requests);
        return ResponseEntity.ok().build();
    }

//    //관심분야 수정
//    @PutMapping("/interest")
//    public ResponseEntity<?> updateInterest(@Valid @RequestBody InterestUpdateRequest request, BindingResult bindingResult){
//        if(bindingResult.hasErrors()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
//        }
//        return new ResponseEntity<>(is.updateInterest(request),HttpStatus.OK);
//    }

    @GetMapping("/lodgment")
    public ResponseEntity<?> findLodgment(
            @RequestParam("lat") Double festival_lat,
            @RequestParam("lng") Double festival_lng,
            @LoginUser User user
    ){
        return ResponseEntity.ok(aroundService.findLodgment(festival_lat, festival_lng, user.getId()));
    }

    @GetMapping("/leports")
    public ResponseEntity<?> findLeports(
            @RequestParam("lat") Double festival_lat,
            @RequestParam("lng") Double festival_lng,
            @LoginUser User user
    ){
        return ResponseEntity.ok(aroundService.findLeports(festival_lat, festival_lng, user.getId()));
    }

    @GetMapping("/culture")
    public ResponseEntity<?> findCulture(
            @RequestParam("lat") Double festival_lat,
            @RequestParam("lng") Double festival_lng,
            @LoginUser User user
    ){
        return ResponseEntity.ok(aroundService.findCulture(festival_lat, festival_lng, user.getId()));
    }

    @GetMapping("/shopping")
    public ResponseEntity<?> findShopping(
            @RequestParam("lat") Double festival_lat,
            @RequestParam("lng") Double festival_lng,
            @LoginUser User user
    ){
        System.out.println(user.getId());
        return ResponseEntity.ok(aroundService.findShopping(festival_lat, festival_lng, user.getId()));
    }
}
