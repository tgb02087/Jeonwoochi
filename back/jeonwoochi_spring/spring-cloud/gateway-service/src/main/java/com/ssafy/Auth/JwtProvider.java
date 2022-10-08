package com.ssafy.Auth;

import com.ssafy.Service.PrincipalDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;

@Component
public class JwtProvider {

    @Value("${token.secret}")
    private String SECRET_KEY;

    @Value("${token.refresh}")
    private String REFRESH_KEY;


    // 유효성 검색, token정보 읽기
    public Claims getATInfo(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(SECRET_KEY))
                .parseClaimsJws(token)
                .getBody();
    }
    // 유효성 검색, refreshtoken정보 읽기
    public Claims getRTInfo(String token) {
        return Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(REFRESH_KEY))
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        System.out.println("검증");
        System.out.println(token);
        try {
            Jws<Claims> claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token);
            System.out.println("현재시간 : "+ new Date());
            System.out.println("만료시간 : "+claims.getBody().getExpiration());
            return !claims.getBody().getExpiration().before(new Date());

        }catch (Exception e){
            return false;
        }
    }

//    public Authentication getAuthentication(String token){
//        UserDetails userDetails = principalDetailsService.loadUserByUsername(getATInfo(token).get("id").toString());
//    }
}
