package com.ssafy.Controller;

import com.ssafy.Dto.Request.*;
import com.ssafy.Service.AnswerService;
import com.ssafy.Service.CategoryService;
import com.ssafy.Service.InterestService;
import com.ssafy.Service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequiredArgsConstructor
public class InterestController {

    private final InterestService is;

    private final CategoryService cs;

    private final QuestionService qs;

    private final AnswerService as;

    //질문 조회
    @GetMapping("/question")
    public ResponseEntity<?> getQuestion(@RequestParam(value = "questionId")Long questionId){
        return new ResponseEntity<>(qs.findQuestion(questionId),HttpStatus.OK);
    }

    //질문 생성
    @PostMapping("/question")
    public ResponseEntity<?> createQuestion(@Valid @RequestBody QuestionRequest request, BindingResult bindingResult){
        System.out.println("if");
        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        System.out.println("request = " + request.getQuestion());
        return new ResponseEntity<>(qs.createQuestion(request),HttpStatus.OK);
    }

    //답변 조회
    @GetMapping("/answer")
    public ResponseEntity<?> getAnswer(@RequestParam(value = "answerId")Long answerId){
        return new ResponseEntity<>(as.findAnswer(answerId),HttpStatus.OK);
    }

    //답변 생성
    @PostMapping("/answer")
    public ResponseEntity<?> createAnswer(@Valid @RequestBody AnswerRequest request, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        return new ResponseEntity<>(as.createAnswer(request),HttpStatus.OK);
    }

    //카테고리 조회
    @GetMapping("/category")
    public ResponseEntity<?> getCategory(@RequestParam(value = "categoryId")Long categoryId){
        return new ResponseEntity<>(cs.findCategory(categoryId),HttpStatus.OK);
    }

    //카테고리 생성
    @PostMapping("/category")
    public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryRequest request, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        return new ResponseEntity<>(cs.createCategory(request),HttpStatus.OK);
    }

    //관심분야 작성
    @PostMapping("/interest")
    public ResponseEntity<?> createInterest(@Valid @RequestBody InterestRequest request, BindingResult bindingResult){
        if(bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        return new ResponseEntity<>(is.createInterest(request),HttpStatus.OK);
    }

    //관심분야 수정
    @PutMapping("/interest")
    public ResponseEntity<?> updateInterest(@Valid @RequestBody InterestUpdateRequest request, BindingResult bindingResult){
        if(bindingResult.hasErrors()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(bindingResult.getAllErrors());
        }
        return new ResponseEntity<>(is.updateInterest(request),HttpStatus.OK);
    }

}
