import React, { useEffect } from 'react';
import { Restaurant } from '../../mocks/handlers/festival_recomm_dist';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData: Restaurant[] | undefined;
}

declare global {
  interface Window {
    // 카카오 API의 타입은 커스텀하여 맞게 설정해야한다.
    // 매우 귀찮기 떄문에, 시간 상 any로 설정했음
    kakao: any;
  }
}

// kakaoMap instance를 담아두기 위한 전역객체
let map: any = undefined;
let marker: any = undefined;

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
    const imageSrc = '/images/map/marker-example.gif';
    const imageSize = new window.kakao.maps.Size(50, 50);

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커 생성
    marker = new window.kakao.maps.Marker({
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

/**
 * @description
 * lat, lng 기준으로 맵 API 렌더링
 * 맛집 버튼 클릭을 통해, 추천 데이터 마킹
 *
 * @author bell
 *
 */
const KakaoMap = ({ coord, restaurantData }: PropTypes) => {
  const { lat, lng } = coord;

  useEffect(() => {
    mapInitHandler(lat, lng);
  }, []);

  useEffect(() => {
    if (restaurantData) {
      mapInitHandler(lat, lng);

      for (let i = 0; i < restaurantData.length; i++) {
        const currPos = restaurantData[i];
        const position = new window.kakao.maps.LatLng(currPos.lat, currPos.lng);

        marker = new window.kakao.maps.Marker({
          map,
          position,
        });
        marker.setMap(map);
      }
    }
  }, [restaurantData]);

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default KakaoMap;
