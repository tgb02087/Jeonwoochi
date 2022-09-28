package com.ssafy.Controller;

import com.ssafy.Domain.Entity.User;
import com.ssafy.Dto.Request.UserRequest;
import com.ssafy.Dto.Response.UserReponse;
import com.ssafy.Service.KakaoService;
import com.ssafy.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class KakaoController {

    @Autowired
    KakaoService ks;

    @Autowired
    public UserService us;

    @GetMapping("/")
    public String indexPage(){
        return "index.html";
    }

//    @RequestMapping(value = "login/getKakaoAuthUrl")
//    public @ResponseBody String getKakaoAuthUrl(HttpServletRequest request) throws Exception {
//        String reqUrl = "https://kauth.kakao.com/oauth/authorize"
//                        + "?client_id=653c5c4f76acf44b796a7c0e107d3d6f"
//                        + "&redirect_uri=http://localhost:8000/user-service/login/oauth_kakao"
//                        + "&response_type=code";
//        System.out.println("url주소 : " + reqUrl);
//        return reqUrl;
//    }

    @GetMapping("login/kakao")
    public ResponseEntity<?> getCI(@RequestParam String code) throws IOException {
        System.out.println("code = " + code);
        String access_token = ks.getToken(code);
        UserReponse userInfo = ks.getUserInfo(access_token);
        ks.userchk(userInfo);
        //model.addAttribute("code", code);
        //model.addAttribute("access_token", access_token);
        //model.addAttribute("userInfo", userInfo);
        return new ResponseEntity<>(userInfo,HttpStatus.OK);
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
}
