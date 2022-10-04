package com.ssafy.Service;

import com.ssafy.Auth.JwtProvider;
import com.ssafy.Domain.Entity.Type.GenderType;
import com.ssafy.Domain.Entity.Type.RoleType;
import com.ssafy.Domain.Redis.AuthRedis;
import com.ssafy.Domain.Repository.AuthRedisRepo;
import com.ssafy.Dto.Request.TokenInfoRequest;
import com.ssafy.Dto.Response.CheckUserResponse;
import com.ssafy.Dto.Response.JwtTokenResponse;
import com.ssafy.Dto.Response.ReJwtTokenResponse;
import com.ssafy.exception.NotFoundException;
import com.ssafy.exception.NotMatchException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.exception.NotFoundException.AUTH_NOT_FOUND;
import static com.ssafy.exception.NotMatchException.RT_NOT_MATCH;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final JwtProvider jp;

    private final AuthRedisRepo arp;

    // 토큰 유효시간 체킹
    public boolean CheckAT(String token) {
        return jp.validateAT(token);
    }

    // AT, RT 생성 후, RT는 Redis저장
    public JwtTokenResponse saveToken(TokenInfoRequest tokenInfoRequest) {
        String AT = jp.makeJwtToken(tokenInfoRequest);
        String RT = jp.makeRefreshToken(tokenInfoRequest);
        // System.out.println("RT : " + RT);
        // System.out.println("id : " + tokenInfoRequest.getId());
        AuthRedis authRedis = AuthRedis.createAuth(tokenInfoRequest.getId(), RT, 30L);
        arp.save(authRedis);
        return new JwtTokenResponse(AT, RT);
    }

    // AT, RT 재생성
    public ReJwtTokenResponse resave(String RT) {
        Claims claims = jp.getClaimsToken(RT);
        Long id = Long.valueOf(claims.get("id").toString());
        int age = Integer.parseInt(claims.get("age").toString());
        GenderType gender = GenderType.valueOf(claims.get("gender").toString());
        RoleType role = RoleType.valueOf(claims.get("role").toString());
        String kakaoToken = claims.get("kakaoToken").toString();

        TokenInfoRequest tokenInfoRequest = new TokenInfoRequest(id, gender, age, role, kakaoToken);
        AuthRedis findauthRedis = arp.findById(tokenInfoRequest.getId())
                .orElseThrow(() -> new NotFoundException(AUTH_NOT_FOUND));

        if (!RT.equals(findauthRedis.getRefreshToken())) {
            throw new NotMatchException(RT_NOT_MATCH);
        }
        String AT = jp.makeJwtToken(tokenInfoRequest);
        boolean RTchk = true;
        if(!jp.validateRT(findauthRedis.getRefreshToken())){
            String newRT = jp.makeRefreshToken(tokenInfoRequest);
            AuthRedis authRedis = AuthRedis.createAuth(tokenInfoRequest.getId(), newRT, 30L);
            arp.save(authRedis);
            RTchk = false;
            return new ReJwtTokenResponse(AT,newRT,RTchk);
        }
//        if (findauthRedis.getExpiration() < 1) {
//            newRT = jp.makeRefreshToken(tokenInfoRequest);
//            AuthRedis authRedis = AuthRedis.createAuth(tokenInfoRequest.getId(), newRT, 30L);
//            arp.save(authRedis);
//            RTchk = false;
//        }
        return new ReJwtTokenResponse(AT, findauthRedis.getRefreshToken(), RTchk);
    }

    // Header 체크
    public CheckUserResponse headerChk(String token, String type) {
        String newtoken = token.replace(type, "");
        return jp.getUserId(newtoken);
    }
}
