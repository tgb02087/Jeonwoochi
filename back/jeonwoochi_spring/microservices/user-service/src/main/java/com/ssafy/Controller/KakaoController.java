package com.ssafy.Controller;

import com.ssafy.Domain.Entity.User;
import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Response.AccessTokenResponse;
import com.ssafy.Dto.Response.JwtTokenResponse;
import com.ssafy.Dto.Response.UserReponse;
import com.ssafy.Service.AuthService;
import com.ssafy.Service.KakaoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class KakaoController {

    private final KakaoService ks;

    private final AuthService as;

    // 카카오 로그인
    @GetMapping("/login/kakao")
    public ResponseEntity<?> kakaoLogin(@RequestParam(value = "token") String token, HttpServletResponse response)
            throws IOException {
        UserReponse userInfo = ks.getUserInfo(token);
        User user = ks.userchk(userInfo);
        TokenInfoRequest tokenInfoRequest = new TokenInfoRequest(
                user.getId(), user.getGender(),
                user.getAge(), user.getRole(), userInfo.getAT());
        JwtTokenResponse jwtTokenResponse = as.saveToken(tokenInfoRequest);
        ResponseCookie cookie = ResponseCookie.from("refresh-token", jwtTokenResponse.getRefreshtoken())
                .maxAge(60 * 60 * 24 * 15)
                .httpOnly(true)
                .secure(true)
                .domain("")
                .path("/")
                .sameSite("None")
                .build();
        response.setHeader("set-Cookie", cookie.toString());
        return new ResponseEntity<>(AccessTokenResponse.create(jwtTokenResponse.getAccesstoken()), HttpStatus.OK);
    }

    // 유저정보 조회
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request) {
        String id = request.getParameter("id");
        List<User> list = ks.findById(id);
        return new ResponseEntity<>(list.get(0), HttpStatus.OK);
    }

    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue("refresh-token") Cookie cookie) throws IOException {
        return new ResponseEntity<>(ks.logout(cookie.getValue()), HttpStatus.OK);
    }

    // 회원 탈퇴
    @GetMapping("/disable")
    public ResponseEntity<?> disable(@RequestParam(value = "id") Long id) {
        return new ResponseEntity<>(ks.userDisable(id), HttpStatus.OK);
    }

}
