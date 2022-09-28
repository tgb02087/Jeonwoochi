import React, { useEffect } from 'react';
import { Restaurant } from '../../mocks/handlers/festival_recomm_dist';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData?: Restaurant[] | undefined;
}

declare global {
  interface Window {
    kakao: any;
  }
}

// kakaoMap instance를 담아두기 위한 전역객체
let map: any = undefined;
// let marker: any = undefined;

/**
 *
 * @description
 * 카카오 맵의 디폴트 맵 설정을 불러오는 호출하는 함수
 * 해당 프로젝트의 디폴트 맵 설정은,
 * 축제의 좌표정보와, 축제 위치를 가리키는 캐릭터 마킹 이미지
 *
 * @author bell
 */
const mapInitHandler = (lat: number, lng: number): void => {
  try {
    const container = document.getElementById('map');
    const center = new window.kakao.maps.LatLng(lat, lng);
    const options = {
      center,
      // 서버 추천 데이터 범위 설정에 맞게 재설정할 예정
      // 3 기본값
      level: 3,
    };

    // 맵 렌더링
    map = new window.kakao.maps.Map(container, options);

    // 마커 이미지 설정
    // 해당 프로젝트의 마킹 이미지는 "캐릭터"이다
    const imageSrc = '/images/map/mira.gif';
    const imageSize = new window.kakao.maps.Size(32, 45);

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커 생성
    const marker = new window.kakao.maps.Marker({
      map,
      image: markerImage,
      position: center,
    });

    // 마커 맵 상에 나타내기
    marker.setMap(map);
    // 캐릭터 마커에 한하여
    // 드래그 설정을 가능하게 했다.
    // 추후에, 드래그 이벤트를 통해, 드래그 한 지역의 위치정보를
    // 알아내는 이벤트를 추가해보려고 이렇게 설정함
    marker.setDraggable(true);
  } catch (err) {
    throw new Error('카카오 맵을 불러오지 못했습니다!');
  }
};

// const markerClickHandler = () => {

// }

/**
 * @description
 * lat, lng 기준으로 맵 API 렌더링
 *
 * @author bell
 */

const KakaoMap = ({ coord, restaurantData }: PropTypes) => {
  const { lat, lng } = coord;

  let prevInfoWindow: any = null;

  useEffect(() => {
    mapInitHandler(lat, lng);
  }, []);

  useEffect(() => {
    if (restaurantData) {
      mapInitHandler(lat, lng);

      for (let i = 0; i < restaurantData.length; i++) {
        const currPos = restaurantData[i];
        const position = new window.kakao.maps.LatLng(currPos.lat, currPos.lng);

        const marker = new window.kakao.maps.Marker({
          map,
          position,
          clickable: true,
        });
        marker.setMap(map);
        /**
         * author: jojo
         */
        // 해당 마커의 음식점 상호명
        const restaurantName = '천복순대국밥 궁동점';

        // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
        const iwContent = document.createElement('div');
        iwContent.setAttribute(
          'style',
          `display: flex;
          flex-direction: column;
          `,
        );

        const iwTitle = document.createElement('div');
        iwTitle.innerText = restaurantName;
        iwTitle.setAttribute(
          'style',
          `
          font-weight: bold;
        `,
        );
        const btnContainer = document.createElement('div');
        btnContainer.setAttribute(
          'style',
          `
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        `,
        );

        // 클릭하면 식당 이름에 맞는 맵 검색 결과 새 창을 띄움
        // 상호명 + 지점명은 나중에 api 적용하면 데이터 거기서 받아오기
        const kakaoLink = document.createElement('a');
        const naverLink = document.createElement('a');
        kakaoLink.innerHTML = '카카오 지도로 보기';
        naverLink.innerHTML = '네이버 지도로 보기';
        kakaoLink.href = 'https://map.kakao.com/?q=' + restaurantName;
        kakaoLink.target = '_blank';
        naverLink.href = 'https://map.naver.com/v5/search/' + restaurantName;
        naverLink.target = '_blank';

        iwContent.appendChild(iwTitle);
        iwContent.appendChild(btnContainer);
        btnContainer.appendChild(kakaoLink);
        btnContainer.appendChild(naverLink);
        // const iwContent = `<div style="padding:5px;">Hello World!</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', function () {
          // 이전에 클릭한 인포윈도우가 있으면 닫습니다
          if (prevInfoWindow) prevInfoWindow.close();

          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
          prevInfoWindow = infowindow;
        });
      }
    }
  }, [restaurantData]);

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default KakaoMap;
