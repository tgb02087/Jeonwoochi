import { useQuery } from '@tanstack/react-query';

import { useGetFoodDataAfterClick } from '../../hooks/useGetFoodDataAfterClick';
import { useGetLodgeDataAfterClick } from '../../hooks/useGetLodgeDataAfterClick';
import { useGetShoppingDataAfterClick } from '../../hooks/useGetShoppingDataAfterClick';
import { useGetCultureDataAfterClick } from '../../hooks/useGetCultureDataAfterClick';
import { useGetLeisureDataAfterClick } from '../../hooks/useGetLeisureDataAfterClick';
import { useGetLandmarkDataAfterClick } from '../../hooks/useGetLandmarkDataAfterClick';

import { MapData } from '../../mocks/handlers/festival_list';
import { AxiosError } from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';
import FestivalMap from '../organisms/FestivalMap';
import FestivalDetail from '../organisms/FestivalDetail';
import getFestivalItem from '../../api/getFestivalItem';
import getWeather from '../../api/getWeather';
import getFestivalNews from '../../api/getFestivalNews';
import getFestivalList from '../../api/getFestivalList';
import { useEffect } from 'react';

import sound from '../../bgm/Thought Soup.mp3';

const MapAPIContainer = styled.div`
  ${tw`flex flex-row`}
`;

const StyledFestivalDetail = styled.div`
  width: 20vw;
`;

// MapAPI 사이즈용 STMP
const StyledMapAPI = styled.div`
  ${tw`w-full h-screen`}
`;

/**
 * @description
 * 동적 라우팅 id 값을 읽어, atoms의 kakaoMap 컴포넌트에
 * 해당 축제의 lat, lng를 보내주는 컴포넌트
 * kakaoMap에 추가적으로 데이터가 필요한 경우
 * 추후 축제 상세페이지와 함께 다양한 이벤트(메인기술) 적용 예정
 * @author bell
 */
const MapAPI = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string | undefined }>();

  useEffect(() => {
    const bgm = new Audio(sound);
    bgm.volume = 0.08;
    bgm.loop = true;
    bgm.play();
  }, []);

  const MAPIDX = id && parseInt(id);
  // 축제 좌표 불러오기
  const mapData = useQuery<MapData[], AxiosError>(['Maps'], getFestivalList);

  // 맛집 데이터 불러오기
  const restaurantData = useGetFoodDataAfterClick();
  const clickFoodButtonHandler = () => restaurantData.refetch();

  // 숙박 데이터 불러오기
  const lodgingData = useGetLodgeDataAfterClick();
  const clickLodgeButtonhandler = () => lodgingData.refetch();

  // 쇼핑 데이터 불러오기
  const shoppingData = useGetShoppingDataAfterClick();
  const clickShopingButtonHandler = () => shoppingData.refetch();

  // 문화 데이터 불러오기
  const cultureData = useGetCultureDataAfterClick();
  const clickCultureButtonHandler = () => cultureData.refetch();

  // 레저 데이터 불러오기
  const leisureData = useGetLeisureDataAfterClick();
  const clickLeisureButtonHandler = () => leisureData.refetch();

  // 관광명소 데이터 불러오기
  const landmarkData = useGetLandmarkDataAfterClick();
  const clickLandmarkButtonHandler = () => landmarkData.refetch();

  const getCoordHandler = (idx: number) => {
    const result = mapData.data!.filter(d => d.festivalId === idx);
    return {
      lat: result[0].lat,
      lng: result[0].lng,
    };
  };

  // 축제 상세 정보 불러오기
  const { data } = useQuery(['info'], getFestivalItem, {
    refetchOnWindowFocus: false,
  });

  const x = 35;
  const y = 127;
  // 날씨 정보 가져오기
  const weatherInfo = useQuery(['weather'], () => getWeather(x, y), {
    enabled: !!data?.title,
    refetchOnWindowFocus: false,
  });

  // 뉴스 정보 가져오기
  const newsInfo = useQuery(['news'], () => getFestivalNews(data?.title), {
    enabled: !!data?.title,
    refetchOnWindowFocus: false,
  });

  return (
    <MapAPIContainer>
      <StyledFestivalDetail>
        <FestivalDetail
          info={data}
          weatherInfo={weatherInfo?.data}
          newsInfo={newsInfo?.data}
          navigate={navigate}
        />
      </StyledFestivalDetail>
      <StyledMapAPI>
        {mapData.isLoading || !MAPIDX ? (
          'Loading...'
        ) : mapData.error ? (
          <div>error: {mapData.error.message}</div>
        ) : mapData.data ? (
          <>
            <FestivalMap
              restaurantData={restaurantData.data}
              lodgeData={lodgingData.data}
              shoppingData={shoppingData.data}
              cultureData={cultureData.data}
              leisureData={leisureData.data}
              landmarkData={landmarkData.data}
              restaurantRecommClickHandler={clickFoodButtonHandler}
              lodgeRecommClickHandler={clickLodgeButtonhandler}
              shoppingRecommClickHandler={clickShopingButtonHandler}
              cultureRecommClickHandler={clickCultureButtonHandler}
              leisureRecommClickHandler={clickLeisureButtonHandler}
              landmarkRecommClickHandler={clickLandmarkButtonHandler}
              coord={getCoordHandler(MAPIDX)}
            />
          </>
        ) : (
          <div>somthing went wrong!</div>
        )}
      </StyledMapAPI>
    </MapAPIContainer>
  );
};

export default MapAPI;
