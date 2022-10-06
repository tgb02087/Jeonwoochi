import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Restaurant } from '../../mocks/handlers/festival_recomm_restaurant';
import { Lodge } from '../../mocks/handlers/festival_recomm_lodge';
import { Shopping } from '../../mocks/handlers/festival_recomm_shopping';
import { Culture } from '../../mocks/handlers/festival_recomm_culture';
import { Map, MapMarker, useMap } from 'react-kakao-maps-sdk';
import { Leisure } from '../../mocks/handlers/festival_recomm_leisure';
import { Landmark } from '../../mocks/handlers/festival_recomm_landmark';

// 마커 사이즈

/**
 * @descrition
 * 인포윈도우 컴포넌트 prop 타입 지정
 * @author bell
 */
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
 * EventMarkerContainer의 Props 타입 지정
 *
 * @author bell
 */

interface PropTypesEventMarkerContainer {
  position: {
    lat: number;
    lng: number;
  };
  markerSrc: string;
}

/**
 * @description
 * 이벤트를 적용한 마커를 생성하는 컴포넌트
 *
 * @param position {object} lat, lng를 값을 담은 객체
 * @param markerSrc {string} 해당하는 마커 이미지의 경로
 *
 * @author bell
 */
const EventMarkerContainer = ({
  position,
  markerSrc,
}: PropTypesEventMarkerContainer): JSX.Element => {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);

  const focusInfoWindowHandler = () => {
    setIsVisible(prev => !prev);
    if (!isVisible) {
      map.setCenter(new kakao.maps.LatLng(position.lng, position.lat));
      // map.panTo(new kakao.maps.LatLng(position.lat, position.lng));
    }
  };

  return (
    <MapMarker
      position={{ lat: position.lng, lng: position.lat }}
      onClick={focusInfoWindowHandler}
      image={{ src: markerSrc, size: { width: 50, height: 50 } }}
    >
      {isVisible && <InfoWindow title={'천복 순대국밥 궁동점'} />}
    </MapMarker>
  );
};

interface PropTypes {
  coord: {
    lat: number;
    lng: number;
  };
  restaurantData?: Restaurant[] | undefined;
  lodgeData?: Lodge[] | undefined;
  shoppingData?: Shopping[] | undefined;
  cultureData?: Culture[] | undefined;
  leisureData?: Leisure[] | undefined;
  // landmarkData?: Landmark[] | undefined;
  isVisibleMarkerRestaurant: boolean;
  isVisibleMarkerLodge: boolean;
  isVisibleMarkerShopping: boolean;
  isVisibleMarkerCulture: boolean;
  isVisibleMarkerLeisure: boolean;
  // isVisibleMarkerLandmark: boolean;
}

/**
 * @description
 * lat, lng 기준으로 맵 API 렌더링
 *
 * @author bell
 */

const KakaoMap = ({
  coord,
  restaurantData,
  lodgeData,
  shoppingData,
  cultureData,
  leisureData,
  // landmarkData,
  isVisibleMarkerRestaurant,
  isVisibleMarkerLodge,
  isVisibleMarkerShopping,
  isVisibleMarkerCulture,
  isVisibleMarkerLeisure,
}: // isVisibleMarkerLandmark,
PropTypes) => {
  const { lat, lng } = coord;
  // 마커 이미지
  const playerSrc = '/images/map/player-marker.gif';
  const restaurantSrc = '/images/map/restaurant_marker.png';
  const lodgeSrc = '/images/map/lodge_marker.png';
  const shoppingSrc = '/images/map/shopping_marker.png';
  const cultureSrc = '/images/map/culture_marker.png';
  const leisureSrc = '/images/map/leisure_marker.png';
  // const landmarkSrc = '/images/map/landmark_marker.png';

  const size = { width: 32, height: 45 };
  const mapRef = useRef(null);

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(lat, lng));

    if (isVisibleMarkerRestaurant && restaurantData) {
      restaurantData.forEach(rd => {
        bounds.extend(new kakao.maps.LatLng(rd.lng, rd.lat));
      });
    }
    if (isVisibleMarkerLodge && lodgeData) {
      lodgeData.forEach(ld => {
        bounds.extend(new kakao.maps.LatLng(ld.lng, ld.lat));
      });
    }
    if (isVisibleMarkerShopping && shoppingData) {
      shoppingData.forEach(sp => {
        bounds.extend(new kakao.maps.LatLng(sp.lng, sp.lat));
      });
    }
    if (isVisibleMarkerCulture && cultureData) {
      cultureData.forEach(cd => {
        bounds.extend(new kakao.maps.LatLng(cd.lng, cd.lat));
      });
    }
    if (isVisibleMarkerLeisure && leisureData) {
      leisureData.forEach(ld => {
        bounds.extend(new kakao.maps.LatLng(ld.lng, ld.lat));
      });
    }
    // if (isVisibleMarkerLandmark && landmarkData) {
    //   landmarkData.forEach(ld => {
    //     bounds.extend(new kakao.maps.LatLng(ld.lat, ld.lng));
    //   });
    // }

    return bounds;
  }, [
    restaurantData,
    lodgeData,
    shoppingData,
    cultureData,
    leisureData,
    // landmarkData,
    isVisibleMarkerRestaurant,
    isVisibleMarkerLodge,
    isVisibleMarkerShopping,
    isVisibleMarkerCulture,
    isVisibleMarkerLeisure,
    // isVisibleMarkerLandmark,
  ]);

  useEffect(() => {
    if (mapRef.current) {
      //@ts-expect-error : react-kakao-maps-sdk type 체크 알 수 없음 -> (useRef 타입 설정 못함)
      mapRef.current.setBounds(bounds);
    }
  }, [
    restaurantData,
    lodgeData,
    shoppingData,
    cultureData,
    leisureData,
    // landmarkData,
    isVisibleMarkerRestaurant,
    isVisibleMarkerLodge,
    isVisibleMarkerShopping,
    isVisibleMarkerCulture,
    isVisibleMarkerLeisure,
    // isVisibleMarkerLandmark,
  ]);

  return (
    <Map
      center={{ lat, lng }}
      style={{ width: '100%', height: '100%' }}
      level={3}
      isPanto={true}
      //@ts-expect-error : react-kakao-maps-sdk type 체크 알 수 없음 -> (useRef 타입 설정 못함)
      ref={mapRef}
    >
      <MapMarker
        position={{ lat, lng }}
        image={{ src: playerSrc, size }}
        draggable={true}
      />
      {isVisibleMarkerRestaurant &&
        restaurantData &&
        restaurantData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={restaurantSrc}
          />
        ))}
      {isVisibleMarkerLodge &&
        lodgeData &&
        lodgeData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={lodgeSrc}
          />
        ))}
      {isVisibleMarkerShopping &&
        shoppingData &&
        shoppingData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={shoppingSrc}
          />
        ))}
      {isVisibleMarkerCulture &&
        cultureData &&
        cultureData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={cultureSrc}
          />
        ))}
      {isVisibleMarkerLeisure &&
        leisureData &&
        leisureData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={leisureSrc}
          />
        ))}
      {/* {isVisibleMarkerLandmark &&
        landmarkData &&
        landmarkData.map((position, index) => (
          <EventMarkerContainer
            key={index}
            position={{ lat: position.lat, lng: position.lng }}
            markerSrc={landmarkSrc}
          />
        ))} */}
    </Map>
  );
};

export default KakaoMap;
