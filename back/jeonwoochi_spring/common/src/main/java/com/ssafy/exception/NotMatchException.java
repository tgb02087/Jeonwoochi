package com.ssafy.exception;

public class NotMatchException extends RuntimeException{
    public static final String RT_NOT_MATCH = "토큰이 일치하지 않습니다.";

    public NotMatchException(String message){
        super(message);
    }
}
