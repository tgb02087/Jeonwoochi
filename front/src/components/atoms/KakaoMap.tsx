import React from 'react';

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
}

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
