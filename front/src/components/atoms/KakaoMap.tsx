import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Restaurant } from '../../mocks/handlers/festival_recomm_restaurant';
import { Lodge } from '../../mocks/handlers/festival_recomm_lodge';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface PropTypesInfoWindow {
  title: string;
}

/**
 * @descrition
 * 인포윈도우 컴포넌트
 * 각 마커의 요약된 내용을 보여준다.
 *
 * @author jojo
 */
const InfoWindow = ({ title }: PropTypesInfoWindow): JSX.Element => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontWeight: 'bold' }}>{title}</div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <a href={`https://map.kakao.com/?q=${title}`} target={'_blank'}>
        카카오 지도로 보기
      </a>
      <a href={`https://map.naver.com/v5/search/${title}`} target={'_blank'}>
        네이버 지도로 보기
      </a>
    </div>
  </div>
);

/**
 * @description
 * EventMarkerContainer의
 *
 * @author bell
 */

interface PropTypesEventMarkerContainer {
  position: {
    lat: number;
    lng: number;
  };
}

const EventMarkerContainer = ({
  position,
}: PropTypesEventMarkerContainer): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <MapMarker
      position={{ lat: position.lat, lng: position.lng }}
      onClick={() => setIsVisible(prev => !prev)}
      // onMouseOver={() => setIsVisible(true)}
      // onMouseOut={() => setIsVisible(false)}
    >
      {isVisible && <InfoWindow title={'천복 순대국밥 궁동점'} />}
    </MapMarker>
  );
};

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

// // kakaoMap instance를 담아두기 위한 전역객체
// let map: any = undefined;
// // let marker: any = undefined;

// /**
//  *
//  * @description
//  * 카카오 맵의 디폴트 맵 설정을 불러오는 호출하는 함수
//  * 해당 프로젝트의 디폴트 맵 설정은,
//  * 축제의 좌표정보와, 축제 위치를 가리키는 캐릭터 마킹 이미지
//  *
//  * @author bell
//  */
// const mapInitHandler = (lat: number, lng: number): void => {
//   try {
//     const container = document.getElementById('map');
//     const center = new window.kakao.maps.LatLng(lat, lng);
//     const options = {
//       center,
//       // 서버 추천 데이터 범위 설정에 맞게 재설정할 예정
//       // 3 기본값
//       level: 3,
//     };

//     // 맵 렌더링
//     map = new window.kakao.maps.Map(container, options);

//     // 마커 이미지 설정
//     // 해당 프로젝트의 마킹 이미지는 "캐릭터"이다
//     const imageSrc = '/images/map/mira.gif';
//     const imageSize = new window.kakao.maps.Size(32, 45);

//     const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

//     // 마커 생성
//     const marker = new window.kakao.maps.Marker({
//       map,
//       image: markerImage,
//       position: center,
//     });

//     // 마커 맵 상에 나타내기
//     marker.setMap(map);
//     // 캐릭터 마커에 한하여
//     // 드래그 설정을 가능하게 했다.
//     // 추후에, 드래그 이벤트를 통해, 드래그 한 지역의 위치정보를
//     // 알아내는 이벤트를 추가해보려고 이렇게 설정함
//     marker.setDraggable(true);
//   } catch (err) {
//     throw new Error('카카오 맵을 불러오지 못했습니다!');
//   }
// };

// const markerClickHandler = () => {

// }

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData?: Restaurant[] | undefined;
  lodgeData?: Lodge[] | undefined;
}

/**
 * @description
 * lat, lng 기준으로 맵 API 렌더링
 *
 * @author bell
 */

const KakaoMap = ({ coord, restaurantData, lodgeData }: PropTypes) => {
  const { lat, lng } = coord;
  const src = '/images/map/mira.gif';
  const size = { width: 32, height: 45 };
  const mapRef = useRef(null);

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    if (restaurantData) {
      restaurantData.forEach(rd => {
        bounds.extend(new kakao.maps.LatLng(rd.lat, rd.lng));
      });
    }
    if (lodgeData) {
      lodgeData.forEach(ld => {
        bounds.extend(new kakao.maps.LatLng(ld.lat, ld.lng));
      });
    }
    return bounds;
  }, [restaurantData, lodgeData]);

  useEffect(() => {
    //@ts-expect-error : react-kakao-maps-sdk type 체크 알 수 없음 -> (useRef 타입 설정 못함)
    if (mapRef.current) mapRef.current.setBounds(bounds);
  }, [restaurantData, lodgeData]);

  return (
    <Map
      center={{ lat, lng }}
      style={{ width: '100%', height: '100%' }}
      level={3}
      //@ts-expect-error : react-kakao-maps-sdk type 체크 알 수 없음 -> (useRef 타입 설정 못함)
      ref={mapRef}
    >
      <MapMarker
        position={{ lat, lng }}
        image={{ src, size }}
        draggable={true}
      />
      {restaurantData &&
        restaurantData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
          />
        ))}
      {lodgeData &&
        lodgeData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
          />
        ))}
    </Map>
  );
};

export default KakaoMap;
