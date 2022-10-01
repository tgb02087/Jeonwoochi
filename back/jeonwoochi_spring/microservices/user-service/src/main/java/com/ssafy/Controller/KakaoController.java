package com.ssafy.Controller;

import com.ssafy.Domain.Entity.User;
import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Request.UserRequest;
import com.ssafy.Dto.Response.UserReponse;
import com.ssafy.Service.KakaoService;
import com.ssafy.Service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.FlashMap;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService ks;

    private final UserService us;

    //test 페이지
    @GetMapping("/")
    public String indexPage(){
        return "index.html";
    }

    @RequestMapping("login/kakao")
    public String getCI(@RequestParam String code, RedirectAttributes redirectAttributes) throws IOException {
        log.info("code = " + code);
        String access_token = ks.getToken(code);
        UserReponse userInfo = ks.getUserInfo(access_token);
        User user = ks.userchk(userInfo);
        TokenInfoRequest tokenInfoRequest = new TokenInfoRequest(
                user.getId(),user.getGender(),
                user.getAge(),user.getRole(),userInfo.getAT()
        );
        redirectAttributes.addFlashAttribute("token",tokenInfoRequest);
        return "redirect:http://localhost:8000/user-service/createjwt";
    }

//    @PostMapping("/jwtcheck")
//    public ResponseEntity<String> jwtcheck(@RequestBody JwtToken jwtToken) throws Exception{
//        //return jwtToken.getJwtToken();
//        return new ResponseEntity<>(jwtToken.getJwtToken(),HttpStatus.OK);
//    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request){
        String id = request.getParameter("id");
        System.out.println("test : "+ id);
        List<User> list = ks.findById(id);
        System.out.println(list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("test") Cookie cookie) throws IOException {
        System.out.println(cookie.getValue());
        String id = ks.logout(cookie.getValue());
        return new ResponseEntity<>(id+"님 로그아웃",HttpStatus.OK);
    }

    @GetMapping("/test1")
    public String test1(){
        System.out.println("test1");
        return "test3";
    }

    @GetMapping("/test11")
    public String test11(RedirectAttributes redirectAttributes){
        System.out.println("test11");
        redirectAttributes.addFlashAttribute("token","getefgetg");
        return "redirect:http://localhost:8000/user-service/test3";
    }

    @GetMapping("/test2")
    public ResponseEntity<?> test2(){
        System.out.println("test2");
        return new ResponseEntity<>("성공",HttpStatus.OK);
    }
}
