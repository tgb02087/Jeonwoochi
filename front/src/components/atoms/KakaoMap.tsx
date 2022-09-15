import React, { Suspense } from 'react';

interface PropTypes {
  coord: {
    lng: number;
    lat: number;
  };
}

const KakaoMap = ({ coord }: PropTypes) => {
  const { lng, lat } = coord;
  return (
    <>
      <div>{lng}</div>
      <div>{lat}</div>
    </>
  );
};

export default KakaoMap;
