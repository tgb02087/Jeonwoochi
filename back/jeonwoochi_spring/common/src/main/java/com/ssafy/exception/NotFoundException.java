package com.ssafy.exception;

public class NotFoundException extends RuntimeException{
    public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public static final String FESTIVAL_TYPE_NOT_FOUND = "존재하지 않느 축제 카테고리 입니다.";
    public static final String FESTIVAL_FORM_NOT_FOUND = "존재하지 않는 축제 요청 내역 입니다.";
    public static final String CHARACTER_NOT_FOUND = "존재하지 않는 캐릭터입니다.";
    public static final String RIDING_NOT_FOUND = "존재하지 않는 탈 것입니다.";
    public static final String INVENTORY_RIDING_NOT_FOUND = "아직 획득하지 못한 탈 것입니다.";
    public static final String GAME_NOT_FOUND = "존재하지 않는 게임 정보입니다.";
    public NotFoundException(String message){
        super(message);
    }
}
