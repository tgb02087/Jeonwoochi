package com.ssafy.Controller;

import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Entity.User;
import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Response.AccessTokenResponse;
import com.ssafy.Dto.Response.CheckUserResponse;
import com.ssafy.Dto.Response.JwtTokenResponse;
import com.ssafy.Dto.Response.ReJwtTokenResponse;
import com.ssafy.Service.AuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.RequestContextUtils;

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

    @GetMapping("/filtertest")
    public ResponseEntity<?> test() {
        System.out.println("test : ");
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }

    // AT, RT 생성, 쿠키 전송
    @PostMapping("/createjwt")
    public ResponseEntity<AccessTokenResponse> createjwt(@RequestBody TokenInfoRequest tokenInfoRequest, HttpServletResponse resp) {
        JwtTokenResponse jwtTokenResponse = as.saveToken(tokenInfoRequest);
        ResponseCookie cookie = ResponseCookie.from("refresh-token", jwtTokenResponse.getRefreshtoken())
                .maxAge(60 * 60 * 24 * 15)
                .httpOnly(true)
                .secure(true)
                .domain("")
                .path("/")
                .sameSite("None")
                .build();
        resp.setHeader("set-Cookie", cookie.toString());
        return new ResponseEntity<>(AccessTokenResponse.create(jwtTokenResponse.getAccesstoken()), HttpStatus.OK);
    }

    //AT, RT 재생성
    @GetMapping("/recreatejwt")
    public ResponseEntity<?> recreatejwt(@CookieValue(value = "refresh-token", required = false) Cookie cookie,
            HttpServletResponse resp) {
        System.out.println(cookie.getValue());
        ReJwtTokenResponse reJwtTokenResponse = as.resave(cookie.getValue());
        if (reJwtTokenResponse.getIsRT()) {
            ResponseCookie newcookie = ResponseCookie.from("refresh-token", reJwtTokenResponse.getRefreshtoken())
                    .maxAge(60 * 60 * 24 * 15)
                    .httpOnly(true)
                    .secure(true)
                    .domain("")
                    .path("/")
                    .sameSite("None")
                    .build();
            resp.setHeader("set-Cookie", newcookie.toString());
        }
        return new ResponseEntity<>(AccessTokenResponse.create(reJwtTokenResponse.getAccesstoken()), HttpStatus.OK);
    }

    // 로그인 세션체킹 & 유저 아이디 반환
    @GetMapping("/checkAT")
    public ResponseEntity<?> checkAT(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);
        // String token = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
        CheckUserResponse checkUserResponse = as.headerChk(token, "Bearer");
        if (checkUserResponse != null)
            return new ResponseEntity<>(checkUserResponse, HttpStatus.OK);
        else
            return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
