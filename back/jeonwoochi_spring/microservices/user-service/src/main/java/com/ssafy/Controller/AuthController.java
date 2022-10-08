package com.ssafy.Controller;

import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Response.*;
import com.ssafy.Service.AuthService;
import com.ssafy.Service.KakaoService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.util.Enumeration;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class AuthController {

    private final AuthService as;

    private final KakaoService ks;

    // AT, RT 생성, 쿠키 전송
    @PostMapping("/createjwt")
    public ResponseEntity<?> createjwt(@RequestBody TokenInfoRequest tokenInfoRequest,
            HttpServletResponse resp) {
        JwtTokenResponse jwtTokenResponse = as.saveToken(tokenInfoRequest);
        ResponseCookie cookie = ResponseCookie.from("refresh-token", jwtTokenResponse.getRefreshtoken())
                .maxAge(1000 * 60 * 60 * 24 * 15)
                .httpOnly(true)
                .secure(true)
                .domain("")
                .path("/")
                .sameSite("None")
                .build();
        resp.setHeader("set-Cookie", cookie.toString());
        return new ResponseEntity<>(CreateTokenResponse.create(jwtTokenResponse.getAccesstoken()), HttpStatus.OK);
    }

    // AT, RT 재생성
    @GetMapping("/recreatejwt")
    public ResponseEntity<?> recreatejwt(@CookieValue(value = "refresh-token", required = false) Cookie cookie,
            HttpServletResponse response) {
        if(cookie.getValue()==null){
            return new ResponseEntity<>("토큰재생성실패",HttpStatus.OK);
        }
        System.out.println("RT : "+cookie.getValue());
        ReJwtTokenResponse reJwtTokenResponse = as.resave(cookie.getValue());
        if (reJwtTokenResponse.getIsRT()) {
            ResponseCookie newcookie = ResponseCookie.from("refresh-token", reJwtTokenResponse.getRefreshtoken())
                    .maxAge(1000 * 60 * 60 * 24 * 15)
                    .httpOnly(true)
                    .secure(true)
                    .domain("")
                    .path("/api")
                    .sameSite("None")
                    .build();
            response.setHeader("set-Cookie", newcookie.toString());
        }
        return new ResponseEntity<>(CreateTokenResponse.create(reJwtTokenResponse.getAccesstoken()), HttpStatus.OK);
    }

    // 로그인 세션체킹 & 유저 아이디 반환
    @GetMapping("/checkAT")
    public ResponseEntity<?> checkAT(HttpServletRequest request, HttpServletResponse resp) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        // String token = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
        CheckUserResponse checkUserResponse = as.headerChk(token, "Bearer");
        if (checkUserResponse != null)
            return new ResponseEntity<>(checkUserResponse, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
