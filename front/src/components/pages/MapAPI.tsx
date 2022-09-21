import { useQuery } from '@tanstack/react-query';
import { useGetFoodDataAfterClick } from './useGetFoodDataAfterClick';

import { MapData } from '../../mocks/handlers/festival_list';
import axios, { AxiosError } from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import tw from 'twin.macro';
import FestivalMap from '../organisms/FestivalMap';
import FestivalDetail from '../organisms/FestivalDetail';
import getFestivalItem from '../../api/getFestivalItem';

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

  const MAPIDX = id && parseInt(id);
  // 축제 좌표 불러오기
  const mapData = useQuery<MapData[], AxiosError>(['Maps'], async () => {
    const response = await axios.get('/festival-service/list');
    return response.data;
  });

  // 맛집 데이터 불러오기
  const restaurantData = useGetFoodDataAfterClick();

  const clickFoodButtonHandler = () => restaurantData.refetch();

  const getCoordHandler = (idx: number) => {
    const result = mapData.data!.filter(d => d.festivalId === idx);
    return {
      lat: result[0].lat,
      lng: result[0].lng,
    };
  };

  const { data, isLoading, isError } = useQuery(['info'], getFestivalItem, {
    staleTime: 1000 * 20,
  });

  return (
    <MapAPIContainer>
      <StyledFestivalDetail>
        <FestivalDetail info={data} navigate={navigate} />
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
              clickHandler={clickFoodButtonHandler}
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
