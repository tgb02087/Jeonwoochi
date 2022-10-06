import { useQuery } from '@tanstack/react-query';
import { useGetFoodDataAfterClick } from '../../hooks/useGetFoodDataAfterClick';
import { useGetLodgeDataAfterClick } from '../../hooks/useGetLodgeDataAfterClick';
import { useGetShoppingDataAfterClick } from '../../hooks/useGetShoppingDataAfterClick';
import { useGetCultureDataAfterClick } from '../../hooks/useGetCultureDataAfterClick';
import { useGetLeisureDataAfterClick } from '../../hooks/useGetLeisureDataAfterClick';
// import { useGetLandmarkDataAfterClick } from '../../hooks/useGetLandmarkDataAfterClick';
import { bgmOff, bgmStart } from '../../utils/mapBgm';
import { history } from '../../utils/History';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import FestivalMap from '../organisms/FestivalMap';
import FestivalDetail from '../organisms/FestivalDetail';
import getFestivalItem from '../../api/getFestivalItem';
import getWeather from '../../api/getWeather';
import getFestivalNews from '../../api/getFestivalNews';
import checkLoginState from '../../api/checkLoginState';
import { useEffect } from 'react';

import { UserInfo, userInfo } from '../../recoil/atoms/userInfo';
import { useSetRecoilState, useRecoilValue } from 'recoil';


const MapAPIContainer = styled.div`
  ${tw`flex flex-row`}
`;

const StyledFestivalDetail = styled.div`
  width: 25vw;
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
  // const { id } = useParams<{ id?: string | undefined }>();
  const location = useLocation();
  // const id = location.state.info.id;
  const mapData: any = location.state;
  // console.log(mapData);
  const [user] = useRecoilState(userInfo);

  // const MAPIDX = id && parseInt(id);
  // 축제 좌표 불러오기
  // const mapData = useQuery<MapData[], AxiosError>(['Maps'], getFestivalList);

  const user: UserInfo | undefined = useRecoilValue(userInfo);

  const { lat, lng } = mapData;
  // 맛집 데이터 불러오기
  const restaurantData = useGetFoodDataAfterClick(lat, lng, user!.id);
  const clickFoodButtonHandler = () => restaurantData.refetch();

  // 숙박 데이터 불러오기
  const lodgingData = useGetLodgeDataAfterClick(lat, lng);
  const clickLodgeButtonhandler = () => lodgingData.refetch();

  // 쇼핑 데이터 불러오기
  const shoppingData = useGetShoppingDataAfterClick(lat, lng);
  const clickShopingButtonHandler = () => shoppingData.refetch();

  // 문화 데이터 불러오기
  const cultureData = useGetCultureDataAfterClick(lat, lng);
  const clickCultureButtonHandler = () => cultureData.refetch();

  // 레저 데이터 불러오기
  const leisureData = useGetLeisureDataAfterClick(lat, lng);
  const clickLeisureButtonHandler = () => leisureData.refetch();

  // 관광명소 데이터 불러오기
  // const landmarkData = useGetLandmarkDataAfterClick();
  // const clickLandmarkButtonHandler = () => landmarkData.refetch();

  // 로그인 여부 체크 후 받은 사용자 객체를 Recoil에 저장하는 Setter
  const setUserData = useSetRecoilState(userInfo);

  useEffect(() => {
    bgmStart();
    checkLoginState(setUserData);
  }, []);

  useEffect(() => {
    const unlisten = history.listen(history => {
      if (history.action === 'POP') bgmOff();
    });

    return () => {
      unlisten();
    };
  }, [history]);

  // 축제 상세 정보 불러오기
  const { data } = useQuery(['info'], () => getFestivalItem(mapData.id), {
    refetchOnWindowFocus: false,
  });

  const x = Math.floor(mapData.lng);
  const y = Math.floor(mapData.lat);
  // 날씨 정보 가져오기
  const weatherInfo = useQuery(['weather', x, y], () => getWeather(x, y), {
    enabled: !!data,
    refetchOnWindowFocus: false,
  });

  // 뉴스 정보 가져오기
  const newsInfo = useQuery(
    ['news', data?.festivalName],
    () => getFestivalNews(data?.festivalName),
    {
      enabled: !!data,
      refetchOnWindowFocus: false,
    },
  );
  if (newsInfo) console.log(newsInfo);

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
        {/* {mapData.isLoading || !MAPIDX ? (
          'Loading...'
        ) : mapData.error ? (
          <div>error: {mapData.error.message}</div>
        ) : mapData.data ? ( */}
        <>
          <FestivalMap
            restaurantData={restaurantData.data}
            lodgeData={lodgingData.data}
            shoppingData={shoppingData.data}
            cultureData={cultureData.data}
            leisureData={leisureData.data}
            // landmarkData={landmarkData.data}
            restaurantRecommClickHandler={clickFoodButtonHandler}
            lodgeRecommClickHandler={clickLodgeButtonhandler}
            shoppingRecommClickHandler={clickShopingButtonHandler}
            cultureRecommClickHandler={clickCultureButtonHandler}
            leisureRecommClickHandler={clickLeisureButtonHandler}
            // landmarkRecommClickHandler={clickLandmarkButtonHandler}
            coord={{ lat: mapData.lng, lng: mapData.lat }}
            navigate={navigate}
            user={user}
          />
        </>
        {/* ) : (
          <div>somthing went wrong!</div>
        )} */}
      </StyledMapAPI>
    </MapAPIContainer>
  );
};

export default MapAPI;
