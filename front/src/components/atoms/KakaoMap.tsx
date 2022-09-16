import React, { useEffect } from 'react';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
}

declare global {
  interface Window {
    kakao: any;
  }
}

/**
 * @description
 * lat, lng 기준으로 맵 API 렌더링
 *
 * @author bell
 */
const KakaoMap = ({ coord }: PropTypes) => {
  const { lat, lng } = coord;

  useEffect(() => {
    const mapInitHandler = () => {
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
        const map = new window.kakao.maps.Map(container, options);

        // 마커 이미지 설정
        const imageSrc = '/images/map/marker-example.gif';
        const imageSize = new window.kakao.maps.Size(50, 50);

        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
        );

        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map,
          image: markerImage,
          position: center,
        });

        // 마커 맵 상에 나타내기
        marker.setMap(map);
        // 마커 드래그 설정
        marker.setDraggable(true);
      } catch (err) {
        console.log(err);
      }
    };

    mapInitHandler();
  }, []);

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default KakaoMap;
