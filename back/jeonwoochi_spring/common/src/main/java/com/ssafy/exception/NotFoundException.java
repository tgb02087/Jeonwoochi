package com.ssafy.exception;

public class NotFoundException extends RuntimeException{
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰정보입니다.";

    public NotFoundException(String message){
        super(message);
    }
}
