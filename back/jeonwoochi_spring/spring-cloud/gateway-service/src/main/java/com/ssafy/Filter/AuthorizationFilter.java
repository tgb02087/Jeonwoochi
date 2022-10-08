package com.ssafy.Filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Date;

@Component
@Slf4j
public class AuthorizationFilter extends AbstractGatewayFilterFactory<AuthorizationFilter.Config> {

    @Value("${token.secret}")
    private String secret;

    public AuthorizationFilter(Environment env) {
        super(Config.class);
    }


    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            //log.info("Jwt검증 전 : 헤더 :" + request.getHeaders());
            //log.info("헤더 정보 : " + request.getHeaders().get(HttpHeaders.AUTHORIZATION));

            if(!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange,"No Authorization Header", HttpStatus.UNAUTHORIZED);
            }

            String authorizationHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
            String jwt = authorizationHeader.replace("Bearer ", "");

            //log.info("Jwt 검증 후" + jwt);
            if(!isJwtValid(jwt)){
                return onError(exchange,"엑세스토큰 만료",HttpStatus.UNAUTHORIZED);
            }

            return chain.filter(exchange).then(Mono.fromRunnable(()->{
                //log.info("Filter 응답code -> {}", response.getStatusCode());
            }));
        });
    }

    public static class Config{}

    private Mono<Void> onError(ServerWebExchange exchange,
                               String error,
                               HttpStatus httpStatus){
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        return response.setComplete();
    }

    private boolean isJwtValid(String jwt) {
        boolean returnValue = true;

        String subject = null;
        try {
            Claims body = Jwts.parser().setSigningKey(secret)
                    .parseClaimsJws(jwt).getBody();

            if (body.getExpiration().before(new Date())) {
                returnValue = false;
            }
        } catch (Exception ex) {
            returnValue = false;
        }

        return returnValue;
    }
}
