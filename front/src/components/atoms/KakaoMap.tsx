import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

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
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      // 서버 추천 데이터 범위 설정에 맞게 재설정할 예정
      // 3 기본값
      level: 3,
    };

    new window.kakao.maps.Map(container, options);
  }, []);

  return <div id="map" style={{ height: '100vh' }}></div>;
};

export default KakaoMap;
