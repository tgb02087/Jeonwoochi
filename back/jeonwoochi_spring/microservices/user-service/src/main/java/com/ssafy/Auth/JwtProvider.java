package com.ssafy.Auth;

import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Response.CheckUserResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    // 엑세스 토큰 생성 키
    @Value("${token.secret}")
    private String SECRET_KEY;

    // 리프레쉬 토큰 생성 키
    @Value("${token.refresh}")
    private String REFRESH_KEY;

    // AceessToken 생성
    public String makeJwtToken(TokenInfoRequest tokenInfoRequest) {
        Date now = new Date();
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(tokenInfoRequest))
                .setExpiration(createExpireDate(1000 * 60 * 1)) // 마지막 분
                // .claim("id", tokenInfoRequest.getId())
                .signWith(SignatureAlgorithm.HS256, createSigningKey(SECRET_KEY))
                .compact();
    }

    // RefreshToekn 생성
    public String makeRefreshToken(TokenInfoRequest tokenInfoRequest) {
        Date now = new Date();
        return Jwts.builder()
                .setHeader(createHeader())
                .setClaims(createClaims(tokenInfoRequest))
                .setExpiration(createExpireDate(1000 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, createSigningKey(REFRESH_KEY))
                .compact();
    }

    // 헤더 부분 생성
    private Map<String, Object> createHeader() {
        Map<String, Object> header = new HashMap<>();

        header.put("typ", "ACCESS_TOKEN");
        header.put("alg", "HS256");
        header.put("regDate", System.currentTimeMillis());
        System.out.println("헤더:" + header.get("typ"));
        return header;
    }

    // 유효시간 설정
    private Date createExpireDate(long expireDate) {
        long curTime = System.currentTimeMillis();
        return new Date(curTime + expireDate);
    }

    // payload 부분 생성
    private Map<String, Object> createClaims(TokenInfoRequest tokenInfoRequest) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", tokenInfoRequest.getId());
        claims.put("gender", tokenInfoRequest.getGender());
        claims.put("age", tokenInfoRequest.getAge());
        claims.put("role", tokenInfoRequest.getRole());
        claims.put("kakaoToken", tokenInfoRequest.getKakaoToken());
        return claims;
    }

    // 해당 key로 암호화
    private Key createSigningKey(String key) {
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(key);
        System.out.println("암호화성공");
        return new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());
    }

    // 유효성 검색, token정보 읽기
    public Claims getClaimsFormToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    // 유효성 검색, refreshtoken정보 읽기
    public Claims getClaimsToken(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(REFRESH_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰 유효시간체킹
    public boolean validateToken(String AT) {
        System.out.println("검증");
        System.out.println(AT);
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(AT);
            System.out.println("현재시간 : " + new Date());
            System.out.println("만료시간 : " + claims.getBody().getExpiration());
            return !claims.getBody().getExpiration().before(new Date());

        } catch (Exception e) {
            return false;
        }
    }

    // 토큰에서 userID 조회
    public CheckUserResponse getUserId(String AT){
        CheckUserResponse checkUserResponse = null;
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(AT);

            Long id = Long.parseLong(claims.getBody().get("id").toString());
            boolean isAdmin = true;
            if(claims.getBody().get("role").toString().equals("USER")){
                isAdmin = false;
            }
            checkUserResponse = new CheckUserResponse(id,isAdmin);
            System.out.println("id : "+id);
        } catch (Exception e) {
            e.printStackTrace();
            return new CheckUserResponse(null,null);
        }
        return checkUserResponse;
    }
}
