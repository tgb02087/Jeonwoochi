package com.ssafy.exception;

public class NotFoundException extends RuntimeException {
    public static final String FESTIVAL_NOT_FOUND = "존재하지 않는 축제입니다.";
    public static final String FESTIVAL_TYPE_NOT_FOUND = "존재하지 않느 축제 카테고리 입니다.";
    public static final String FESTIVAL_FORM_NOT_FOUND = "존재하지 않는 축제 요청 내역 입니다.";
    public static final String CHARACTER_NOT_FOUND = "존재하지 않는 캐릭터입니다.";
    public static final String RIDING_NOT_FOUND = "존재하지 않는 탈 것입니다.";
    public static final String INVENTORY_RIDING_NOT_FOUND = "아직 획득하지 못한 탈 것입니다.";
    public static final String GAME_NOT_FOUND = "존재하지 않는 게임 정보입니다.";
    public static final String AUTH_NOT_FOUND = "존재하지 않는 토큰정보입니다.";
    public static final String REVIEW_NOT_FOUND = "존재하지 않는 리뷰입니다.";
    public static final String INTEREST_NOT_FOUND = "존재하지 않는 관심사항입니다.";
    public static final String ANSWER_NOT_FOUND = "존재하지 않는 답안입니다.";
    public static final String QUESTION_NOT_FOUND = "존재하지 않는 질문입니다.";
    public static final String USER_NOT_FOUND = "존재하지 않는 유저입니다.";
    public static final String CATEGORY_NOT_FOUND = "존재하지 않는 카테고리입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
