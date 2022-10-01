package com.ssafy.exception;

public class NotMatchException extends RuntimeException {

    public static final String PASSWORD_NOT_MATCH = "비밀번호가 틀렸습니다.";
    public static final String TOKEN_NOT_MATCH = "잘못된 토큰 정보입니다.";
    public static final String RT_NOT_MATCH = "토큰이 일치하지 않습니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
