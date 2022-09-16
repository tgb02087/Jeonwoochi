import React from 'react';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
}

/**
 * @description
 * lat, lng 기준으로
 * 카카오 맵 API 렌더링 예정
 *
 * @author bell
 */

const KakaoMap = ({ coord }: PropTypes) => {
  const { lat, lng } = coord;
  return (
    <div>
      <div>{lat}</div>
      <div>{lng}</div>
    </div>
  );
};

export default KakaoMap;
