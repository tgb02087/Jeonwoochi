## 220908
### 종현
+ 사용 안하는 코드 지우기
+ git cz + 이모지 설정

### 성찬
+ ESLint + Prettier 적용

### 성훈
+ ESLint + Prettier + git cz 적용

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

### 성훈
+ 프로젝트 라우팅 설정
  + 페이지 폴더 구조 생성
+ 프로젝트 MSW 설정
  + test mock file 생성

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

### 성훈
+ 공통 컴포넌트 - Image
  + border-radius 줄 수 있는 `radius` prop 추가
+ 공통 컴포넌트 - Input
+ styled-component -> `tw.macro`로 변경

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

### 성훈
+ `Selected` 컴포넌트 추가
  + 관심사 Image 클릭 시 체크 + 색 바꿈
  + icons 폴더 추가
  + `Check` 아이콘 컴포넌트 추가
+ `Interest` 페이지 컴포넌트 추가
+ react-query 세팅

## 220916
### 종현
+ kakao map API
  + 초기 기본 셋팅
  + lat,lng 기반 map 렌더링

### 성훈
+ `InterestCards` 컴포넌트 추가
+ 모킹 데이터 파일 추가
  + `interest_question.ts` 추가
  + `interest_answer.ts` 추가

### 성찬
+ 실제 지도와 Phaser 타일맵 간 매핑 방법 연구
  + 한 칸당 km 단위로 압축, 전체 맵 크기를 650 x 800 칸으로 설정
+ Tiled를 사용하여 대한민국 국토 타일맵을 100 x 100 칸으로 임시 생성
  + 임시 타일맵 생성 후 피드백 결과, 실제 국토 타일맵을 생성할 땐 한 칸 단위의 섬은 삭제할 예정

## 220917
### 성훈
+ `Interest` 컴포넌트 수정
  + clickStates 상태 배열 추가
  + page 번호 상태 추가
  + click 이벤트 추가
+ `InterestCards` 컴포넌트 수정
+ `InterestCard` 컴포넌트 추가
+ `getInterestAnswers.ts` 데이터 fetch 파일 추가
+ `Image` 컴포넌트 수정
  + html에 원래 있는 태그 속성(src, id 등)은 string type임.
  + 속성을 number로 주기 위해 속성 `id`를 `no`로 수정

### 성찬
+ 중간발표 PPT 전반적인 틀 작성, 피드백 요청

## 220918
### 종현
+ 맛집 추천 버튼
  + 맛집 추천 버튼 스타일링
  + msw 맛집 추천 더미 데이터 생성
  + 커스텀 훅 추가 : useGetFoodDataAfterClick
+ 발표준비
+ 고민점
  + 요청이 추가될 수록 반복되는 요청이 많아진다, 이거 줄이는 방법 없을까?

### 성훈
+ mock 이미지 src 변경
+ `PageButtons` 컴포넌트 추가
  + 현재 페이지를 나타내고 이전, 다음 페이지로 갈 수 있는 버튼 존재

### 성찬
+ 피드백을 기반으로 중간발표 PPT 마무리

## 220919
### 성훈
+ `Main UI` 아이콘들 추가
  + `Alert`, `LeftV`, `RightV`, `Profile`, `Question`
+ `FestivalSideBar` 컴포넌트 추가
  + 오른쪽에 떠 있는 추천 축제 3개
  + 클릭 시 사라지고 나타나는 이벤트 boolean state와 css로 구현
+ 추천 축제 모킹 파일 추가
  + `festival_recomm.ts`

## 220920
### 성훈
+ 관심사 페이지의 `CharacterQuestion` 컴포넌트 추가
  + 캐릭터 아바타 이미지 public/images/interest에 추가
  + `getInterestQuestions.ts` 데이터 fetch 파일 추가
+ Interest 폴더 밑의 파일들 다른 폴더로 빼는 작업
  + api 폴더 만들고 `getInterestAnswers.ts` 파일 api 폴더로 이관
  + Selected 컴포넌트도 organisms 폴더로 이관