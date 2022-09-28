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

+ 성찬
  + 국토 타일맵을 `100 x 100`에서 `800 x 700`칸으로 확장
    + 실제 대한민국 국토를 참고하기 위해 네이버 지도 스크린샷을 Tiled 프로그램에서 반투명 레이어로 띄워놓고 작업
    + 원래 네이버 지도 이미지 오버레이도 타일맵에 추가하려 했으나, Tiled에서는 이미지 자체를 타일맵에 반영할 수 없어서 포기
  + 확장한 타일맵을 프로젝트에 적용


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
  + .env 파일 git에서 제거 + 로컬에 .env.local 추가될

+ 성찬
  + 타일맵 및 플레이어 스프라이트 에셋 탐색
  + 좌표에 따른 축제 오브젝트 배치 연구

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

+ 성찬
  + 축제 오브젝트 배치 테스트
    + `32 x 32` 타일 크기를 기준으로 `(0, 0)`에 배치하면 각 타일의 좌측 상단을 기준으로 배치되는 것이 아니라 타일의 정가운데를 기준으로 배치되기 때문에, 해당 부분을 방지하기 위해 배치할 `x` 및 `y` 좌표 값에 각각 16을 추가했음
  + 축제 리스트 조회 API 호출 코드 추가 (`festival_list` 모킹 API 활용)

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

+ 성찬
  + React 컴포넌트와 Phaser 인스턴스 간의 통신 방법 탐구
    + 방법 1: Phaser 인스턴스를 React 컴포넌트 형식으로 만들기
      + Phaser는 특정 DOM에 Canvas를 생성하여 동작하는 방식이므로 의미가 없음
    + 방법 2: Recoil 대신 Redux 사용
      + Redux 자체는 React에 종속적이지 않아서 바닐라 JS에서도 사용할 수 있음
      + 벤치마킹 대상인 [SkyOffice](https://github.com/kevinshen56714/SkyOffice)에서도 사용한 방법
      + 근데 새로운 기술을 공부하는 차원에서 도입한 Recoil을 버리기에는 다시 한 번 진지하게 고민할 필요가 있음
    + 방법 3: API 호출 데이터를 Recoil에 저장하는 과정에서 `localStorage`에 저장, Phaser 인스턴스 내부에서 `localStorage`에 저장된 값 불러오기
      + 근데 이러면 Recoil을 사용하는 의미가 퇴색됨
    + 방법 4: Node.js의 내장 모듈인 `events` 활용, React 컴포넌트와 Phaser 인스턴스 사이를 이벤트로 연결
      + 현재로선 가장 가능성이 높음

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

+ 성찬
  + React 컴포넌트와 Phaser 인스턴스 간의 통신 구현
    + Recoil을 경유하는 방법을 사용하려 했으나, `useRecoilState()`로 Phaser 인스턴스를 저장하는 과정에서 설정 값이 비어있는 새 Phaser 인스턴스가 생성되어 게임 실행이 지장이 생김
    + Node.js의 내장 모듈인 `events`의 `EventEmitter`를 사용, Vue의 이벤트 버스와 비슷하게 로직 구현
      + 즉, React 컴포넌트에서 특정 이벤트를 `emit`하면, Phaser 인스턴스 내부에서 이벤트를 `on`하여 수신
      + 실제로 이벤트를 통한 데이터 전송 확인 완료
      + 굳이 Recoil을 경유해서 통신을 구현할 필요가 없었음
  + 축제 리스트 조회 API 응답 결과를 객체에서 배열 타입으로 수정
    + 응답 결과를 객체 형식으로 오인하여 비구조화 할당을 진행해서 결과 값을 받을 수 없었음

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

+ 성찬
  + 타일맵, 플레이어 스프라이트 에셋 탐색
    + 타일맵은 itch.io에서 유료로 구매 완료
    + 플레이어 스프라이트는 후보로 몇 개 선택해놓은 상태임
      + 추후에 적절히 커스텀하여 사용할 예정
  + 충돌 이벤트가 적용된 축제 오브젝트 생성 로직 익히기
  
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

+ 성찬
  + 충돌 로직이 적용된 축제 오브젝트 생성 이슈 해결
    + `create()`에 이벤트 수신 코드를 넣으면 종종 이벤트를 받지 못하는 경우가 생겨서 `preload()`로 옮겼음
    + 축제 리스트 조회 API를 호출했을 때 발생하는 이벤트 `festivals`를 수신했을 때 각 축제 정보를 받으면서 축제 오브젝트를 화면에 렌더링해야 하는데, 표시되지 않음
    + 이벤트 수신 콜백 함수 내부에 오브젝트 생성 로직을 넣거나 `this` 바인딩을 바꿔도 마찬가지였음
    + `create()`, `update()`에서는 정상적으로 오브젝트가 생성되지만, 이벤트 수신 결과에 따라 오브젝트를 생성하는 방법은 `update()`에 더 적합하다고 판단했음
    + `update()`의 `time` 파라미터를 이용하여 5초에 한 번씩 축제 오브젝트를 업데이트하는 Polling 방식의 생성 로직을 구현했으나, 축제 데이터는 자주 갱신되지 않으므로 비효율적이라고 생각하여 다른 방법을 탐구했음
    + API 호출 & 이벤트 수신할 때마다 `festivalListFetched` 값을 `true`로 설정하고, 정기적으로 `update()`에서 `festivalListFetched` 상태를 관찰하여 해당 값이 `true`일 경우 축제 오브젝트 생성 로직을 수행하면서 `festivalListFetched` 값을 `false`로 설정함에 따라 기존의 Polling 방식보다 훨씬 효율적으로 오브젝트 생성이 가능해짐
  + 축제의 위도 및 경도와 타일맵 좌표 매핑 방법 연구
    + 하버사인 공식(Haversine formula)를 사용, 프로젝트에 어떻게 적용할 것인지 좀 더 고민해볼 것

## 220928
+ 종현
+ 마나 (도력) 만들기
  + 마나 창을 관리한 클래스 생성
  + 마나 `value` 디폴트 값 100
  + `draw()`
    + 현재 `value`를 토대로, 게이지 바 새롭게 업데이트
    + 일정 이하인 경우 게이지 색 변환
  + `decrease()`
    + `value` 값 지속적으로 0.1 감소 
  + `increase()`
    + `value` 값 지속적으로 1 증가 
+ 마나 이벤트
  + 캐릭터 이동 시 마나 창도 함께 움직이도록
  + 스킬 사용 시, `decrease()` 호출
  + 스킬 사용 모두 해제 상태 시 `increase()` 호출
  + 마나 게이지 0 인 경우, 캐릭터 기본 상태로 반영
    + 스킬 시전 상태 모두 해제
    + 스킬 아이콘 모두 제거
    + 기본 `collider` 다시 적용 (단, 중복된 `collider` 가 존재하는 경우는 추가 x)
+ 미니맵 디데일 추가
  + 마킹 캐릭터 변경 `sample` -> `mira`
  + audio 파일 import 를 위한 환경설정 : Audio.d.ts
  + 버튼 클릭시 효과음 추가 - 현재: 코인소리, 차후 바꿀 예정

+ 성찬
  + 하버사인 공식을 적용하는 대신, 기존에 구했던 국토 상하좌우 끝단의 위도 & 경도와 타일맵 좌표 간의 비율을 계산하여 매핑을 진행했음
  + 타일맵 가로 x 세로 사이즈는 `800 x 700`
  + 1칸당 좌우 거리 = `(극동 경도 - 극서 경도) / 800 = 0.0105512489147287º`
  + 1칸당 상하 거리 = `(극북 위도 - 극남 위도) / 700 = 0.0087993421052632º`
  + 상하좌우 여분의 간격 포함
    + 맵 전체 중 가장 왼쪽의 경도 = `극서 경도 - (0.0105512489147287º * 83칸) = 124.1909130100775º`
    + 맵 전체 중 가장 오른쪽의 경도 = `극동 경도 + (0.0105512489147287º * 72칸) = 132.6319121418605º`
    + 맵 전체 중 가장 위쪽의 위도 = `극북 위도 + (0.0087993421052632º * 52칸) = 38.90756578947369º`
    + 맵 전체 중 가장 아래쪽의 위도 = `극남 위도 - (0.0087993421052632º * 40칸) = 32.74802631578947º`
  + 타일맵의 가장 왼쪽의 경도와 가장 아래쪽의 위도를 기준으로 파라미터로 받은 축제의 경도 & 위도를 타일맵 x & y 좌표로 변환 완료
  + 축제 오브젝트 상단에 축제명 표시
    + 축제명을 표시하는 이름표의 배경은 피그마에서 따로 생성 후 정적 이미지 폴더에 저장
    + 정상적으로 표시되는 걸 확인한 후 `둥근모꼴` 폰트 적용 완료
