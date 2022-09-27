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
### 종현
  + 발표

### 성훈
+ `Main UI` 아이콘들 추가
  + `Alert`, `LeftV`, `RightV`, `Profile`, `Question`
+ `FestivalSideBar` 컴포넌트 추가
  + 오른쪽에 떠 있는 추천 축제 3개
  + 클릭 시 사라지고 나타나는 이벤트 boolean state와 css로 구현
+ 추천 축제 모킹 파일 추가
  + `festival_recomm.ts`

### 성찬
+ 리액트 TS 프로젝트 내에 Phaser 임포트 방법 탐구

## 220920
### 종현
+ `MapAPI.tsx` 맛집추천 버튼 이벤트 생성
  + `Button.tsx`에 도달하여, `useGetFoodDataAfterClick` 호출 
  + 이벤트 호출 후, 데이터 확보 시, `prop`을 통해 `KakaoMap.tsx` 까지 전달
  + `restaurantData` 가 참인 경우, 새로운 마킹이미지가 추가
  + `useEffect()` 를 활용하여 `Kakaomap.tsx`가 재렌더링 하도록 설정

### 성훈
+ 관심사 페이지의 `CharacterQuestion` 컴포넌트 추가
  + 캐릭터 아바타 이미지 public/images/interest에 추가
  + `getInterestQuestions.ts` 데이터 fetch 파일 추가
+ Interest 폴더 밑의 파일들 다른 폴더로 빼는 작업
  + api 폴더 만들고 `getInterestAnswers.ts` 파일 api 폴더로 이관
  + Selected 컴포넌트도 organisms 폴더로 이관
+ 축제 모달 관련 컴포넌트 추가
  + `FestivalModal` 컴포넌트 추가
  + `TitleCancelHeader` 컴포넌트 추가
  + `FestivalInfos` 컴포넌트 추가
  + `getFestivalItem.ts` 데이터 fetch 파일 추가
  + 모킹 데이터 파일 추가

### 성찬
+ 리액트 TS 프로젝트 내에 Phaser 임포트
  + `game` 폴더 아래에, 게임 설정 파일(`config.ts`)과 게임 씬 관리 파일(`BootScene.ts`), 게임 실행 훅(`useGame.ts`) 파일 생성
    + 게임 씬 관리 파일 안에 타일맵, 플레이어 이동과 같은 로직이 존재하므로, 추후에 리팩토링 예정
  + 국토 타일맵(`jeonwoochi-tilemap.png`) 이미지 추가
  + 타일맵의 속성을 관리하는 `country-map.json` 파일 추가
+ 게임 화면을 보여주는 `GameView` 컴포넌트 생성
  + `Main` 페이지 컴포넌트에 추가

## 220921
+ 종현
  + `phaser` 사전학습

+ 성훈
  + MapAPI 페이지 왼쪽의 Festival Detail 컴포넌트 추가
  + Link atom(a tag로 만든 styled component) 추가
    + Festival Infos의 축제 url을 Text 컴포넌트에서 Link 컴포넌트로 변경


## 220922
+ 종현
  + `BootScene.ts` 리팩토링
    + `Player.ts` 생성 및 `Sprite` 관련 코드 모두 이관
    + `variable`, `contructor`, `preload()`, `update()` 설정
    + `Sprite()`,`cursor()` 이벤트 모두 이관
    + 기존 코드와 맞도록 `type` 설정
    + `animation` 설정
    + 정상 작동
  + 진행상황 발표
  + 포트폴리오 쓰는 법 수강

+ 성훈
  + 날씨 API 학습
  + .env 파일 git에서 제거 + 로컬에 .env.local 추가

## 220923
+ 종현
  + 전문가 리뷰
  + 전문가 리뷰 활동일지 작성
  + 에러 확인 : 카메라 고정 안됨
    + `Player` 클래스 내부에, `Sprite` 데이터 저장 변수 생성 `me`
    + `Player` 인스턴스 생성후, `me`를 통해 기존의 이벤트를 진행하도록 셋팅
    + 카메라 고정 `me` 로 셋팅하니 정상작동
  + `bgm` 및 `player` 발자국 사운드 탐색
  + `bootScene.ts` 에 `bgm` 삽입
    + 1곡 지정, infinite 설정
    + 예쁜 곡 없음 (바꿀예정)
    + 뭔가 테일즈위버스러운 `bgm` 찾고 있는중
    + 가능하다면 여러곡 넣고, 한곡 끝나면 다음곡이 나오고 하면 좋을듯
    + `bootScene`을 벗어나는 경우 음악이 안나오다가, `bootScene` 에 오는 경우 이어서 재생
  + `collide` 설계
    + `Arcade` 에서는 기본 `Sprite` 생성 시, 자동으로 `collide`를 위한 `sensor`가 자동 탑재된다.
    + 허나 `collide`에 대한 다양한 이벤트를 생성하는 것은 불가능하다.
    + `Arcade` 에선 주로 `collide`는 바운드 이벤트로 쓰인다. (공을 몰고 간다, 벽에서 물체가 튕겨 움직인다.)
    + 두 `Sprite`에 대하여 `player`가 현재 `collide` 상태를 확인 할 수 있다면, 축제별 페이지를 호출하는 것이 가능하다! 
    + 검증 결과 성공. 어떻게 리액트 컴포넌트를 나오도록 이벤트를 걸지 고민해보자.
  + `collide` 확인용, `featival` 더미 오브젝트 생성
    + `festivals.png`, `festivals_atlas.json` 생성
    + `county-map.json` 기반으로, 오브젝트 데이터 확인 
    + `collide` 시, 벡터 적용 안되도록, `staticSprite`로 제어
    + `scene`에 `collider` 추가 

+ 성훈
  + CORS 이슈 수정 시도. 시간이 너무 많이 들어 백에서 처리하기로 협의
  + 축제 기사 naver api 학습

## 220924
+ 종현
  + 미니맵 설계
    + 동일한 조건의 카메라 추가
    + 전체 맵 : 줌 크기를 확대하여 캐릭터에 맵이 자세히 적게 보이도록
    + 미니 맵 : 줌 크기를 축소하여 캐릭터와 맵이 작게 많이 보이도록
    + 왼쪽 아래 공간에 잘 배치한다면, 미니맵과 같은 연출이 가능
    + 맵 설정은 동일하게, 단 미니맵에서도 카메라가 캐릭터를 따라가도록 설정

+ 성훈
  + 맵 마커 클릭 시 보여줄 데이터 구조 설계
    + 마커 클릭 시 카카오, 네이버 지도 링크를 담은 오버레이를 생성
    + 클릭 시 해당 음식점 상호+지점명으로 검색한 맵 결과 새 창을 띄워줌.

## 220925
+ 종현
  + Resources.ts
    + 오브젝트 생성 클래스 생성
    + 오브젝트 `collide` 방지 위해, `staticSprite`로 선정
    + 오브젝트 생성 이벤트 전부 클래스로 이동
    + 현 기능 정상 작동

+ 성훈
  + 맵 마커 클릭 이벤트 구현
    + KakaoMap atom 안에 구현해 추후 따로 파일로 빼는 것 고려
  + 백엔드(강호)와 날씨, 뉴스 API 논의
    + API 사용법 전파
    + req, res 형식 협의

## 220926
+ 종현
+ 내 꼼퓨타 서버 만들기
  + ec2 메모리 부족 확인
  + 포맷 후 리눅스 설치
  + KT DDNS 설정 -> 실패
  + ubuntu 22.04 설치 -> 모종의 이유로 실패
  + xubuntu 설치 성공
  + no-ip 셋팅
  + 개인 내부 ip 통해 접속되는 것 확인!
  
## 220927
+ 종현
+ 내 꼼퓨타 서버 만들기
  + 와이파이 연결
  + 포트포워딩 22 설정
  + 접속 성공 확인
  + 간간히 되었다 안되었다 하는 듯??
  + 포트포워딩 추가 6379 
+ `Player` `move` 이벤트 변경
  + `cursor` -> `WASD` (마우스 사용 고려)
  + `cursor` 이벤트에서 `inputKeys` 이벤트로 변경
  + 새로운 키보드 이벤트의 경우 이어서 추가만 하면 됨
+ `Player's skill` : Haste
  + 키 이벤트 추가
  + `Player` 에 스킬 시전 상태 추가
  + 시전 상태시 속도 증가
  + 시전 상태 해제시 속도 기본값으로
+ `Player's skill` : revitation
  + 키 이벤트 추가
  + `Player` 에 스킬 시전 상태 추가
  + 시전 상태시 `world` collide 영향 무효화
  + 시전 상태 해제시 `world` collide 반영