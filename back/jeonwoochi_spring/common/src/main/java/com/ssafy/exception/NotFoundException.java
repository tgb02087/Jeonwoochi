package com.ssafy.exception;

public class NotFoundException extends RuntimeException{
    public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public static final String FESTIVAL_TYPE_NOT_FOUND = "존재하지 않느 축제 카테고리 입니다.";
    public static final String FESTIVAL_FORM_NOT_FOUND = "존재하지 않는 축제 요청 내역 입니다.";

    public NotFoundException(String message){
        super(message);
    }
}
