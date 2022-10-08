package com.ssafy.Domain.Redis;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import java.util.concurrent.TimeUnit;

@RedisHash("auth")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class AuthRedis {
    @Id
    private Long userId;

    private String refreshToken;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long expiration;

    @Builder
    public static AuthRedis createAuth(Long userId, String refreshToken, Long expiration){
        AuthRedis authRedis = new AuthRedis();
        authRedis.userId = userId;
        authRedis.refreshToken = refreshToken;
        authRedis.expiration = expiration;
        return authRedis;
    }
}
