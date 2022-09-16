## 220908
### 종현
+ 사용 안하는 코드 지우기
+ git cz + 이모지 설정

### 성찬
+ ESLint + Prettier 적용

## 220913
### 종현
+ 깃랩 머지 설정
  + 싸피 깃랩 적용 안됨
  + 약식으로 진행하는 것으로
+ recoil 초기 설정

### 성찬
+ 전역 스타일 및 `Pretendard` & `둥근모꼴` 폰트 적용
+ 크로스 브라우징 이슈를 위한 Reset CSS(`minireset.css`) 적용
+ styled-components, Tailwind CSS 설치
  + styled-components 타입 정의 라이브러리 설치
+ styled-components 전역 스타일을 관리할 수 있는 `ThemeProvider` 세팅

## 220914
### 종현
+ 머지 리퀘스트 테스트
+ 공통 컴포넌트 - 버튼
+ 공통 컴포넌트 - 텍스트
+ styled-component -> tw.macro로 변경
+ 프론트 규칙 추가
  + propTypes : 일단 타입스크립트 하나로 타입 지정
  + defaultProps 의 경우는 propTypes 쓰는 거 가능

### 성찬
+ styled-components 타입 선언 파일(`.d.ts`) 생성
  + 전역 스타일 타입 선언 파일(`theme.d.ts`)도 생성
+ Tailwind CSS와 styled-components를 동시에 사용할 수 있도록 twin.macro 디펜던시 설치
+ `Sheet` 컴포넌트 구현
  + 반투명 여부를 결정하는 `transparent` prop 추가
  + 추후에 패딩 너비를 정할 수 있는 `size` prop 추가 예정

## 220915
### 종현
+ mock-server : map handler 추가
  + 서버 응답 생성
  + ERD를 기반으로 한 더미 데이터 생성
+ react-query test
  + suspense, error-boundary 실패
+ `MapAPI` 페이지 설계
  + 동적 라우팅 적용
  + festival id를 기반으로 한 lat,lng 설정
  + 이후 `KakaoMap` 컴포넌트로 데이터가 전달되도록


### 성찬
+ 로그인 페이지 라우트 연결
+ 로그인 페이지 및 로그인 폼 컴포넌트 생성
+ `Button` 스타일 리팩토링
+ `Button`, `Text` 컴포넌트의 색상을 정할 수 있는 `color` prop 추가
+ 각 소셜 로그인 버튼의 디자인 변경


## 220916
### 종현
+ kakao map API
  + 초기 기본 셋팅
  + lat,lng 기반 map 렌더링
